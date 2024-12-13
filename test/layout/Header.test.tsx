import { render, screen } from "@testing-library/react";
import Header from "../../src/components/header/Header";
import * as useWorkerHook from "../../src/hooks/useWorker";
import { MockInstance } from "vitest";
import { WorkerMatch, WorkerProfile } from "../../src/lib/types/workerTypes";
import { mockMatches, mockProfile } from "../mocks/data";
import { createFullName } from "../../src/lib/utils/createFullName";
import { BrowserRouter } from "react-router";

describe("Header Component", () => {
  let useWorkerSpy: MockInstance<
    (workerId: string) => {
      profile: WorkerProfile | null;
      loading: boolean;
      error: string | null;
      matches: WorkerMatch[];
    }
  >;

  beforeEach(() => {
    useWorkerSpy = vi.spyOn(useWorkerHook, "default");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render the logo and worker name", () => {
    useWorkerSpy.mockReturnValue({
      profile: mockProfile,
      loading: false,
      error: "",
      matches: mockMatches,
    });

    render(<Header />, { wrapper: BrowserRouter });

    const logo = screen.getByAltText("swipejobs Logo");
    expect(logo).toBeVisible();

    const workerName = screen.getByText(
      createFullName(mockProfile.firstName, mockProfile.lastName)
    );
    expect(workerName).toBeVisible();
  });

  it("should show the loader while loading", () => {
    useWorkerSpy.mockReturnValue({
      profile: null,
      loading: true,
      error: null,
      matches: [],
    });

    render(<Header />, { wrapper: BrowserRouter });

    const loader = screen.getByLabelText("Loading");
    expect(loader).toBeVisible();
  });

  it("should show an error message when there is an error", () => {
    useWorkerSpy.mockReturnValue({
      profile: null,
      loading: false,
      error: "Could not fetch profile",
      matches: [],
    });

    render(<Header />, { wrapper: BrowserRouter });

    const errorMessage = screen.getByText("Error: Could not fetch profile");
    expect(errorMessage).toBeVisible();
  });
});
