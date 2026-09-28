import { describe, expect, it, vi } from "vitest";
import http from "http";
import type { AddressInfo } from "net";
import app from "./index";
import type express from "express";

async function listenApp(expressApp: express.Express): Promise<{ url: string; close: () => Promise<void> }> {
  const server = http.createServer(expressApp);
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });
  const addr = server.address() as AddressInfo;
  const url = `http://127.0.0.1:${addr.port}`;
  const close = () =>
    new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  return { url, close };
}

describe("API index and error handler", () => {
  it("responds to health check endpoint", async () => {
    const { url, close } = await listenApp(app);
    try {
      const res = await fetch(`${url}/api/health`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe("ok");
      expect(data.timestamp).toBeDefined();
    } finally {
      await close();
    }
  });

  it("handles standard Error object in error handler", () => {
    const errorHandler = app._router.stack.find(
      (layer: any) => layer.handle && layer.handle.length === 4
    )?.handle;

    expect(errorHandler).toBeDefined();

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const req = {} as express.Request;
    let statusCode = 0;
    let jsonPayload: any = null;
    const res = {
      headersSent: false,
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(payload: any) {
        jsonPayload = payload;
        return this;
      },
    } as unknown as express.Response;
    const next = vi.fn();

    errorHandler(new Error("Test error message"), req, res, next);

    expect(statusCode).toBe(500);
    expect(jsonPayload).toEqual({ error: { message: "Test error message" } });

    consoleSpy.mockRestore();
  });

  it("handles custom status and statusCode in error handler", () => {
    const errorHandler = app._router.stack.find(
      (layer: any) => layer.handle && layer.handle.length === 4
    )?.handle;

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Test object with status property
    let statusCode = 0;
    let jsonPayload: any = null;
    let res = {
      headersSent: false,
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(payload: any) {
        jsonPayload = payload;
        return this;
      },
    } as unknown as express.Response;

    errorHandler({ status: 400, message: "Bad Request" }, {} as express.Request, res, vi.fn());
    expect(statusCode).toBe(400);
    expect(jsonPayload).toEqual({ error: { message: "Bad Request" } });

    // Test object with statusCode property
    res = {
      headersSent: false,
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(payload: any) {
        jsonPayload = payload;
        return this;
      },
    } as unknown as express.Response;

    errorHandler({ statusCode: 404, message: "Not Found" }, {} as express.Request, res, vi.fn());
    expect(statusCode).toBe(404);
    expect(jsonPayload).toEqual({ error: { message: "Not Found" } });

    consoleSpy.mockRestore();
  });

  it("handles non-object/string errors and fallback defaults", () => {
    const errorHandler = app._router.stack.find(
      (layer: any) => layer.handle && layer.handle.length === 4
    )?.handle;

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // String error
    let statusCode = 0;
    let jsonPayload: any = null;
    let res = {
      headersSent: false,
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(payload: any) {
        jsonPayload = payload;
        return this;
      },
    } as unknown as express.Response;

    errorHandler("String error thrown", {} as express.Request, res, vi.fn());
    expect(statusCode).toBe(500);
    expect(jsonPayload).toEqual({ error: { message: "String error thrown" } });

    // Fallback for null / undefined / empty object
    res = {
      headersSent: false,
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(payload: any) {
        jsonPayload = payload;
        return this;
      },
    } as unknown as express.Response;

    errorHandler(null, {} as express.Request, res, vi.fn());
    expect(statusCode).toBe(500);
    expect(jsonPayload).toEqual({ error: { message: "Internal server error" } });

    consoleSpy.mockRestore();
  });

  it("does not send response if headersSent is true", () => {
    const errorHandler = app._router.stack.find(
      (layer: any) => layer.handle && layer.handle.length === 4
    )?.handle;

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const statusSpy = vi.fn();
    const res = {
      headersSent: true,
      status: statusSpy,
    } as unknown as express.Response;

    errorHandler(new Error("Already sent"), {} as express.Request, res, vi.fn());
    expect(statusSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
