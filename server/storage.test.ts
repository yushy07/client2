import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("./_core/env", () => ({
  ENV: {
    forgeApiUrl: "https://forge.example.com",
    forgeApiKey: "test-key",
  },
}));

import { storagePut } from "./storage";

describe("storagePut", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a Blob and upload correctly when data is a string", async () => {
    const fetchMock = vi.fn((url: string | URL) => {
      const urlStr = url.toString();
      if (urlStr.includes("v1/storage/presign/put")) {
        return Promise.resolve(
          new Response(JSON.stringify({ url: "https://s3.example.com/presigned-put" }), { status: 200 })
        );
      }
      return Promise.resolve(new Response(null, { status: 200 }));
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await storagePut("test.txt", "hello world", "text/plain");

    expect(result.key).toMatch(/^test_[a-f0-9]{8}\.txt$/);
    expect(result.url).toBe(`/storage/${result.key}`);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const [, secondCallOpts] = fetchMock.mock.calls[1];
    expect(secondCallOpts?.method).toBe("PUT");
    expect(secondCallOpts?.headers).toEqual({ "Content-Type": "text/plain" });
    expect(secondCallOpts?.body).toBeInstanceOf(Blob);
  });

  it("should create a Blob and upload correctly when data is a Buffer or Uint8Array", async () => {
    const fetchMock = vi.fn((url: string | URL) => {
      const urlStr = url.toString();
      if (urlStr.includes("v1/storage/presign/put")) {
        return Promise.resolve(
          new Response(JSON.stringify({ url: "https://s3.example.com/presigned-put" }), { status: 200 })
        );
      }
      return Promise.resolve(new Response(null, { status: 200 }));
    });

    vi.stubGlobal("fetch", fetchMock);

    const bufferData = Buffer.from("binary data");
    const result = await storagePut("image.png", bufferData, "image/png");

    expect(result.key).toMatch(/^image_[a-f0-9]{8}\.png$/);
    expect(result.url).toBe(`/storage/${result.key}`);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const [, secondCallOpts] = fetchMock.mock.calls[1];
    expect(secondCallOpts?.method).toBe("PUT");
    expect(secondCallOpts?.headers).toEqual({ "Content-Type": "image/png" });
    expect(secondCallOpts?.body).toBeInstanceOf(Blob);
  });
});
