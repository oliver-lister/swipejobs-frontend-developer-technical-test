import { describe, it, expect } from "vitest";
import apiService from "../../src/services/apiService";
import { mockProfile } from "../mocks/data";

const WORKER_ID = import.meta.env.VITE_WORKER_ID;

describe("ApiService", () => {
  it("should fetch worker profile successfully", async () => {
    const profile = await apiService.getWorkerProfile(WORKER_ID);
    expect(profile).toEqual(mockProfile);
  });

  it("should throw an error for a workerId that does not exist", async () => {
    await expect(
      apiService.getWorkerProfile("invalid-uuid")
    ).rejects.toThrowError(/failed to fetch profile/i);
  });
});
