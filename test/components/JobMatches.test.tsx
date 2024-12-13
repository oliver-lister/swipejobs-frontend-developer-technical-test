import { render, screen } from "@testing-library/react";
import JobMatches from "../../src/components/JobMatches";
import * as useWorkerHook from "../../src/hooks/useWorker";
import { vi } from "vitest";
import { BrowserRouter } from "react-router";
import { WorkerMatch, WorkerProfile } from "../../src/lib/types/workerTypes";
import { mockMatches, mockProfile } from "../mocks/data";

vi.mock("../hooks/useWorker");

describe("JobMatches Component", () => {
  let mockUseWorker: {
    loading: boolean;
    error: string | null;
    matches: WorkerMatch[];
    profile: WorkerProfile | null;
  };

  beforeEach(() => {
    mockUseWorker = {
      loading: false,
      error: null,
      matches: mockMatches,
      profile: mockProfile,
    };

    vi.spyOn(useWorkerHook, "default").mockReturnValue(mockUseWorker);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders skeletons while loading", () => {
    mockUseWorker.matches = [];
    mockUseWorker.loading = true;
    mockUseWorker.profile = null;

    render(<JobMatches />, { wrapper: BrowserRouter });

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(6);
  });

  it("renders job match cards when matches are available", () => {
    render(<JobMatches />, { wrapper: BrowserRouter });

    expect(screen.getByText(mockMatches[0].jobTitle.name)).toBeInTheDocument();
    expect(screen.getByText(mockMatches[0].company.name)).toBeInTheDocument();
  });

  it("does not render job match cards when matches are empty", () => {
    mockUseWorker.matches = [];

    render(<JobMatches />, { wrapper: BrowserRouter });

    const jobCards = screen.queryAllByTestId("job-match-card");
    expect(jobCards).toHaveLength(0);
  });
});
