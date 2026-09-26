import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  createServiceEnquiry: vi.fn(),
}));

import { createServiceEnquiry } from "./db";
import { appRouter, serviceEnquiryInput } from "./routers";
import { calculatePaintEstimate, findStoreByPincode } from "../shared/paintTools";

describe("service enquiries", () => {
  beforeEach(() => vi.mocked(createServiceEnquiry).mockReset());

  it("validates all five required fields", () => {
    const result = serviceEnquiryInput.safeParse({
      name: "Aria Shah",
      phone: "+91 98765 43210",
      email: "aria@example.com",
      serviceType: "Premium home painting",
      pincode: "560001",
    });

    expect(result.success).toBe(true);
    expect(serviceEnquiryInput.safeParse({ ...result.data, pincode: "west" }).success).toBe(false);
  });

  it("persists a valid enquiry through the public procedure", async () => {
    vi.mocked(createServiceEnquiry).mockResolvedValue({ id: 42 });
    const caller = appRouter.createCaller({} as never);
    const input = {
      name: "Aria Shah",
      phone: "+91 98765 43210",
      email: "aria@example.com",
      serviceType: "Premium home painting",
      pincode: "560001",
    };

    await expect(caller.enquiries.create(input)).resolves.toEqual({ success: true, enquiryId: 42 });
    expect(createServiceEnquiry).toHaveBeenCalledWith(input);
  });

  it("calculates estimates and only returns studios mapped to a supported pincode", () => {
    expect(calculatePaintEstimate("villa", "exterior", 1000, "224129")).toEqual({ low: 17400, high: 21228 });
    expect(calculatePaintEstimate("studio", "interior", 80, "224129")).toBeNull();
    expect(findStoreByPincode("224129")?.name).toBe("Jaymurti Traders");
    expect(findStoreByPincode("110001")).toBeUndefined();
  });
});
