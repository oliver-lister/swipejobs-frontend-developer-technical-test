import { describe, it, expect } from "vitest";
import apiService from "../../src/services/apiService";
import { mockMatches, mockProfile } from "../mocks/data";

const WORKER_ID = import.meta.env.VITE_WORKER_ID;

describe("ApiService", () => {
  describe("getWorkerProfile", () => {
    it("should fetch a worker profile successfully for a valid workerId", async () => {
      const profile = await apiService.getWorkerProfile(WORKER_ID);
      expect(profile).toEqual(mockProfile);
    });

    it("should throw an error for a workerId that does not exist", async () => {
      await expect(
        apiService.getWorkerProfile("invalid-uuid")
      ).rejects.toThrowError(/Could not find profile for workerId/i);
    });
  });

  describe("getWorkerMatches", () => {
    it("should fetch a worker's job matches successfully for a valid workerId", async () => {
      const matches = await apiService.getWorkerMatches(WORKER_ID);
      expect(matches).toEqual(mockMatches);
    });

    it("should throw an error for a workerId that does not exist", async () => {
      await expect(
        apiService.getWorkerMatches("invalid-uuid")
      ).rejects.toThrowError(/Could not find matches for workerId/i);
    });
  });

  describe("isJobMatchForWorker", () => {
    it("should return the corresponding jobId if the job exists in the worker's matches", async () => {
      const jobId = mockMatches[0].jobId;

      const matchedJobId = await apiService["isJobMatchForWorker"](
        WORKER_ID,
        jobId
      );

      expect(matchedJobId).toEqual(jobId);
    });

    it("should throw an error for jobId that has not been matched to the worker", async () => {
      const invalidJobId = "invalid-uuid";

      await expect(
        apiService["isJobMatchForWorker"](WORKER_ID, invalidJobId)
      ).rejects.toThrowError(/No job match found/i);
    });

    it("should throw an error for a workerId that does not exist", async () => {
      const invalidWorkerId = "invalid-uuid";
      const jobId = mockMatches[0].jobId;

      await expect(
        apiService["isJobMatchForWorker"](invalidWorkerId, jobId)
      ).rejects.toThrowError(/Could not find matches for workerId/i);
    });
  });

  describe("acceptJob", () => {
    it("should accept a job that has been matched to the worker, and is still available", async () => {
      const response = await apiService.acceptJob(
        WORKER_ID,
        mockMatches[1].jobId
      );

      expect(response).toEqual({ success: true });
    });

    it("should throw an error when accepting a job that has been matched to the worker, but is NOT available", async () => {
      const unavailableJobId = mockMatches[0].jobId;

      await expect(
        apiService.acceptJob(WORKER_ID, unavailableJobId)
      ).rejects.toThrowError(/Sorry, this role was no longer available/);
    });

    it("should throw an error for a jobId that does not exist or is not matched with workerId", async () => {
      const invalidJobId = "invalid-uuid";

      await expect(
        apiService.acceptJob(WORKER_ID, invalidJobId)
      ).rejects.toThrowError(/No job match found for workerId/i);
    });
  });

  describe("rejectJob", () => {
    it("should reject a job that has been matched to the worker, and is still available", async () => {
      const response = await apiService.rejectJob(
        WORKER_ID,
        mockMatches[1].jobId
      );

      expect(response).toEqual({ success: true });
    });

    it("should throw an error when rejecting a job that has been matched to the worker, but is NOT available", async () => {
      const unavailableJobId = mockMatches[0].jobId;

      await expect(
        apiService.rejectJob(WORKER_ID, unavailableJobId)
      ).rejects.toThrowError(/Sorry, this role was no longer available/);
    });

    it("should throw an error for a jobId that does not exist or is not matched with workerId", async () => {
      const invalidJobId = "invalid-uuid";

      await expect(
        apiService.rejectJob(WORKER_ID, invalidJobId)
      ).rejects.toThrowError(/No job match found for workerId/i);
    });
  });
});
