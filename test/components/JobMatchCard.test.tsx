import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import JobMatchCard from "../../src/components/jobMatchCard/JobMatchCard";
import { mockMatches } from "../mocks/data";
import * as useMatchHook from "../../src/hooks/useMatch";
import { BrowserRouter } from "react-router";

vi.mock("../../hooks/useMatch");

describe("JobMatchCard", () => {
  let mockUseMatch: {
    loading: boolean;
    acceptJob: (jobId: string) => Promise<void>;
    rejectJob: (jobId: string) => Promise<void>;
    accepted: boolean;
    rejected: boolean;
    error: string | null;
  };

  beforeEach(() => {
    mockUseMatch = {
      loading: false,
      acceptJob: vi.fn(),
      rejectJob: vi.fn(),
      accepted: false,
      rejected: false,
      error: null,
    };

    vi.spyOn(useMatchHook, "default").mockReturnValue(mockUseMatch);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the job title and company name", () => {
    const match = mockMatches[0];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText(match.jobTitle.name)).toBeInTheDocument();
    expect(screen.getByText(match.company.name)).toBeInTheDocument();
  });

  it("displays formatted wage and distance", () => {
    const match = mockMatches[0];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });

    expect(
      screen.getByText((_, element) => {
        return element?.textContent === "$9.50";
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/3.40 miles from your job search location/i)
    ).toBeInTheDocument();
  });

  it("renders the shift dates", () => {
    const match = mockMatches[0];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });
    expect(
      screen.getByText(/SEP 4, WED 4:00 PM - 12:00 AM CDT/i)
    ).toBeInTheDocument();
  });

  it("renders the location and report-to information", () => {
    const match = mockMatches[0];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });
    expect(
      screen.getByText(match.company.address.formattedAddress)
    ).toBeInTheDocument();
    expect(screen.getByText("Judy Smith (213) 001 0012")).toBeInTheDocument();
  });

  it("renders requirements if available", () => {
    const match = mockMatches[1];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText("Safety Vest")).toBeInTheDocument();
    expect(screen.getByText("Hart Hat")).toBeInTheDocument();
  });

  it("calls acceptJob when 'I'll Take It' button is clicked", () => {
    const match = mockMatches[0];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });
    const button = screen.getByText("I'll Take It");
    fireEvent.click(button);
    expect(mockUseMatch.acceptJob).toHaveBeenCalledWith(match.jobId);
  });

  it("calls rejectJob when 'No Thanks' button is clicked", () => {
    const match = mockMatches[0];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });
    const button = screen.getByText("No Thanks");
    fireEvent.click(button);
    expect(mockUseMatch.rejectJob).toHaveBeenCalledWith(match.jobId);
  });

  it("displays loading state while accepting a job", () => {
    mockUseMatch.loading = true;
    mockUseMatch.accepted = false;
    const match = mockMatches[0];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getAllByText("Loading")).toHaveLength(2);
  });

  it("displays accepted state when a job is accepted", () => {
    mockUseMatch.accepted = true;

    const match = mockMatches[0];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText("Accepted")).toBeInTheDocument();
  });

  it("displays rejected state when a job is rejected", () => {
    mockUseMatch.rejected = true;
    const match = mockMatches[0];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  it("displays error message when there is an error", () => {
    mockUseMatch.error = "Something went wrong!";
    const match = mockMatches[0];
    render(<JobMatchCard match={match} workerId="12345" />, {
      wrapper: BrowserRouter,
    });
    expect(
      screen.getByText("Error: Something went wrong!")
    ).toBeInTheDocument();
  });
});
