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
  }, 10000);

  it("handles database insertion error and throws DatabaseUnavailableError", async () => {
    const { createServiceEnquiry, DatabaseUnavailableError } = await import("./db");
    const dbError = new Error("Connection failed or query timeout");
    mockValues.mockRejectedValueOnce(dbError);

    await expect(createServiceEnquiry(testEnquiry)).rejects.toThrow(DatabaseUnavailableError);
  });

  it("throws DatabaseUnavailableError when database is not configured/available", async () => {
    vi.resetModules();
    delete process.env.DATABASE_URL;

    const { createServiceEnquiry, DatabaseUnavailableError } = await import("./db");

    await expect(createServiceEnquiry(testEnquiry)).rejects.toThrow(DatabaseUnavailableError);
  });

  it("throws DatabaseUnavailableError when mysql.createPool throws during connection", async () => {
    vi.resetModules();
    process.env.DATABASE_URL = "mysql://invalid-url";

    const mysql = await import("mysql2");
    vi.spyOn(mysql.default, "createPool").mockImplementationOnce(() => {
      throw new Error("Pool creation failure");
    });

    const { createServiceEnquiry, DatabaseUnavailableError } = await import("./db");

    await expect(createServiceEnquiry(testEnquiry)).rejects.toThrow(DatabaseUnavailableError);
  });
});
