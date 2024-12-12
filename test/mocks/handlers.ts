import { http, HttpResponse } from "msw";
import {
  mockAcceptMatchResponseFail,
  mockAcceptMatchResponseSuccess,
  mockMatches,
  mockProfile,
  mockRejectMatchResponseFail,
  mockRejectMatchResponseSuccess,
} from "./data";
import {
  AcceptMatchResponse,
  ErrorResponse,
  RejectMatchResponse,
  WorkerMatch,
  WorkerProfile,
} from "../../src/lib/types/workerTypes";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const WORKER_ID = import.meta.env.VITE_WORKER_ID;

type GetProfileParams = {
  workerId: string;
};

type GetProfileResponseBody = WorkerProfile | ErrorResponse;

type GetMatchesParams = {
  workerId: string;
};

type GetMatchesResponseBody = WorkerMatch[] | ErrorResponse;

type PostAcceptMatchParams = {
  workerId: string;
  jobId: string;
};

type PostAcceptMatchResponseBody = AcceptMatchResponse;

type PostRejectMatchParams = {
  workerId: string;
  jobId: string;
};

type PostRejectMatchResponseBody = RejectMatchResponse;

export const handlers = [
  http.get<GetProfileParams, undefined, GetProfileResponseBody>(
    `${BASE_URL}/worker/:workerId/profile`,
    ({ params }) => {
      const { workerId } = params;

      if (workerId !== WORKER_ID) {
        return HttpResponse.json(
          {
            success: false,
            message: `Could not find profile for workerId: ${workerId}`,
            errorCode: "NOT-FOUND-404",
          },
          { status: 404 }
        );
      }

      return HttpResponse.json(mockProfile);
    }
  ),
  http.get<GetMatchesParams, undefined, GetMatchesResponseBody>(
    `${BASE_URL}/worker/:workerId/matches`,
    ({ params }) => {
      const { workerId } = params;

      if (workerId !== WORKER_ID) {
        return HttpResponse.json(
          {
            success: false,
            message: `Could not find matches for workerId: ${workerId}`,
            errorCode: "NOT-FOUND-404",
          },
          { status: 404 }
        );
      }

      return HttpResponse.json(mockMatches);
    }
  ),
  http.get<PostAcceptMatchParams, undefined, PostAcceptMatchResponseBody>(
    `${BASE_URL}/worker/:workerId/job/:jobId/accept`,
    ({ params }) => {
      const { workerId, jobId } = params;

      const takenJobId = mockMatches[0].jobId;

      if (jobId === takenJobId) {
        return HttpResponse.json(mockAcceptMatchResponseFail, { status: 500 });
      }

      if (workerId !== WORKER_ID) {
        return HttpResponse.json(
          {
            success: false,
            message: `Could not find matches for workerId: ${workerId}`,
            errorCode: "NOT-FOUND-404",
          },
          { status: 404 }
        );
      }

      return HttpResponse.json(mockAcceptMatchResponseSuccess);
    }
  ),
  http.get<PostRejectMatchParams, undefined, PostRejectMatchResponseBody>(
    `${BASE_URL}/worker/:workerId/job/:jobId/reject`,
    ({ params }) => {
      const { workerId, jobId } = params;

      const takenJobId = mockMatches[0].jobId;

      if (jobId === takenJobId) {
        return HttpResponse.json(mockRejectMatchResponseFail, { status: 500 });
      }

      if (workerId !== WORKER_ID) {
        return HttpResponse.json(
          {
            success: false,
            message: `Could not find matches for workerId: ${workerId}`,
            errorCode: "NOT-FOUND-404",
          },
          { status: 404 }
        );
      }
      return HttpResponse.json(mockRejectMatchResponseSuccess);
    }
  ),
];
