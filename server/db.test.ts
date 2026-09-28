import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockValues = vi.fn();
const mockInsert = vi.fn().mockImplementation(() => ({
  values: mockValues,
}));

const mockDb = {
  insert: mockInsert,
};

vi.mock("mysql2", () => ({
  default: {
    createPool: vi.fn().mockReturnValue({
      end: vi.fn(),
    }),
  },
}));

vi.mock("drizzle-orm/mysql2", () => ({
  drizzle: vi.fn(() => mockDb),
}));

describe("createServiceEnquiry", () => {
  const originalEnv = process.env.DATABASE_URL;
  const testEnquiry = {
    name: "John Doe",
    phone: "+91 9876543210",
    email: "john@example.com",
    serviceType: "Painting",
    pincode: "560001",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.DATABASE_URL = "mysql://user:pass@localhost:3306/db";
  });

  afterEach(() => {
    process.env.DATABASE_URL = originalEnv;
  });

  it("inserts enquiry into database and returns insert ID when DB is available", async () => {
    const { createServiceEnquiry } = await import("./db");
    mockValues.mockResolvedValueOnce([{ insertId: 789 }]);

    const result = await createServiceEnquiry(testEnquiry);

    expect(result).toEqual({ id: 789 });
    expect(mockInsert).toHaveBeenCalled();
    expect(mockValues).toHaveBeenCalledWith(testEnquiry);
  });

  it("handles database insertion error, logs warning, and returns fallback ID", async () => {
    const { createServiceEnquiry } = await import("./db");
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const dbError = new Error("Connection failed or query timeout");
    mockValues.mockRejectedValueOnce(dbError);

    const result = await createServiceEnquiry(testEnquiry);

    expect(result).toHaveProperty("id");
    expect(typeof result.id).toBe("number");
    expect(warnSpy).toHaveBeenCalledWith(
      "[Database] Failed to insert enquiry into database:",
      dbError,
    );

    warnSpy.mockRestore();
  });

  it("falls back to generated timestamp ID when database is not configured/available", async () => {
    vi.resetModules();
    delete process.env.DATABASE_URL;

    const { createServiceEnquiry } = await import("./db");

    const result = await createServiceEnquiry(testEnquiry);

    expect(result).toHaveProperty("id");
    expect(typeof result.id).toBe("number");
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("falls back to generated timestamp ID when mysql.createPool throws during connection", async () => {
    vi.resetModules();
    process.env.DATABASE_URL = "mysql://invalid-url";

    const mysql = await import("mysql2");
    vi.spyOn(mysql.default, "createPool").mockImplementationOnce(() => {
      throw new Error("Pool creation failure");
    });

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { createServiceEnquiry } = await import("./db");

    const result = await createServiceEnquiry(testEnquiry);

    expect(result).toHaveProperty("id");
    expect(typeof result.id).toBe("number");

    warnSpy.mockRestore();
  });
});
