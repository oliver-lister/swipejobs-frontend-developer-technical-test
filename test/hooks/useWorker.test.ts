import { renderHook, waitFor } from "@testing-library/react";
import useWorker from "../../src/hooks/useWorker";
import apiService from "../../src/services/apiService";
import { mockMatches, mockProfile } from "../mocks/data";
import { MockInstance } from "vitest";
import { WorkerMatch, WorkerProfile } from "../../src/lib/types/workerTypes";

describe("useWorker", () => {
  let getWorkerProfileSpy: MockInstance<
    (workerId: string) => Promise<WorkerProfile>
  >;
  let getWorkerMatchesSpy: MockInstance<
    (workerId: string) => Promise<WorkerMatch[]>
  >;

  beforeEach(() => {
    getWorkerProfileSpy = vi.spyOn(apiService, "getWorkerProfile");
    getWorkerMatchesSpy = vi.spyOn(apiService, "getWorkerMatches");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch worker profile and matches on mount", async () => {
    getWorkerProfileSpy.mockResolvedValueOnce(mockProfile);
    getWorkerMatchesSpy.mockResolvedValueOnce(mockMatches);

    const { result, unmount } = renderHook(() => useWorker("123"));

    await waitFor(async () => {
      expect(result.current.profile).toEqual(mockProfile);
      expect(result.current.matches).toEqual(mockMatches);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
    });

    unmount();
  });

  it("should handle getWorkerProfile errors from apiService", async () => {
    const workerId = "123";
    const mockErrorMessage = `Could not find profile for workerId: ${workerId}`;
    getWorkerProfileSpy.mockRejectedValueOnce(new Error(mockErrorMessage));
    getWorkerMatchesSpy.mockResolvedValueOnce(mockMatches);

    const { result, unmount } = renderHook(() => useWorker(workerId));

    await waitFor(async () => {
      expect(result.current.error).toEqual(mockErrorMessage);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.profile).toEqual(null);
      expect(result.current.matches).toEqual([]);
    });
    unmount();
  });

  it("should handle getWorkerMatches errors from apiService", async () => {
    const workerId = "123";
    const mockErrorMessage = `Could not find matches for workerId: ${workerId}`;
    getWorkerProfileSpy.mockResolvedValueOnce(mockProfile);
    getWorkerMatchesSpy.mockRejectedValueOnce(new Error(mockErrorMessage));

    const { result, unmount } = renderHook(() => useWorker(workerId));

    await waitFor(async () => {
      expect(result.current.error).toEqual(mockErrorMessage);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.profile).toEqual(null);
      expect(result.current.matches).toEqual([]);
    });

    unmount();
  });

  it("should fetch another workers profile and matches if workerId changes", async () => {
    const mockWorkerId = "123";
    getWorkerProfileSpy.mockResolvedValueOnce(mockProfile);
    getWorkerMatchesSpy.mockResolvedValueOnce(mockMatches);

    const { result, unmount, rerender } = renderHook(
      (workerId: string = mockWorkerId) => useWorker(workerId)
    );

    await waitFor(async () => {
      expect(result.current.profile).toEqual(mockProfile);
      expect(result.current.matches).toEqual(mockMatches);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
    });

    const newMockProfile = {
      ...mockProfile,
      firstName: "James",
      lastName: "Blogs",
    };

    const newMockMatches = [
      ...mockMatches,
      {
        ...mockMatches[1],
        jobTitle: {
          name: "The best job",
          imageUrl: mockMatches[1].jobTitle.imageUrl,
        },
      },
    ];

    getWorkerProfileSpy.mockResolvedValueOnce(newMockProfile);
    getWorkerMatchesSpy.mockResolvedValueOnce(newMockMatches);

    rerender("124");

    await waitFor(async () => {
      expect(result.current.profile).toEqual(newMockProfile);
      expect(result.current.matches).toEqual(newMockMatches);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
    });

    unmount();
  });
});
