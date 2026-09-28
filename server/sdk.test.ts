import { describe, expect, it, vi } from "vitest";
import { SDKServer } from "./_core/sdk";

describe("SDKServer getUserInfo & getUserInfoWithJwt", () => {
  it("derives loginMethod from platforms array in getUserInfo", async () => {
    const mockPost = vi.fn().mockResolvedValue({
      data: {
        openId: "user_123",
        projectId: "proj_456",
        name: "Test User",
        email: "test@example.com",
        platforms: ["REGISTERED_PLATFORM_GOOGLE"],
      },
    });

    const mockAxios = {
      post: mockPost,
    } as any;

    const sdk = new SDKServer(mockAxios);
    const result = await sdk.getUserInfo("mock_access_token");

    expect(mockPost).toHaveBeenCalledWith(
      "/webdev.v1.WebDevAuthPublicService/GetUserInfo",
      { accessToken: "mock_access_token" }
    );
    expect(result).toEqual({
      openId: "user_123",
      projectId: "proj_456",
      name: "Test User",
      email: "test@example.com",
      platforms: ["REGISTERED_PLATFORM_GOOGLE"],
      platform: "google",
      loginMethod: "google",
    });
  });

  it("derives loginMethod from platform fallback when platforms is empty in getUserInfoWithJwt", async () => {
    const mockPost = vi.fn().mockResolvedValue({
      data: {
        openId: "user_789",
        projectId: "proj_456",
        name: "JWT User",
        email: "jwt@example.com",
        platform: "custom_platform",
      },
    });

    const mockAxios = {
      post: mockPost,
    } as any;

    const sdk = new SDKServer(mockAxios);
    const result = await sdk.getUserInfoWithJwt("mock_jwt_token");

    expect(mockPost).toHaveBeenCalledWith(
      "/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt",
      { jwtToken: "mock_jwt_token", projectId: expect.any(String) }
    );
    expect(result).toEqual({
      openId: "user_789",
      projectId: "proj_456",
      name: "JWT User",
      email: "jwt@example.com",
      platform: "custom_platform",
      loginMethod: "custom_platform",
    });
  });
});
