import { http, HttpResponse } from "msw";
import { mockProfile } from "./data";
import { WorkerProfile } from "../../src/lib/types/workerTypes";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const WORKER_ID = import.meta.env.VITE_WORKER_ID;

type GetProfileParams = {
  workerId: string;
};

type GetProfileResponseBody = WorkerProfile | { error: string };

export const handlers = [
  http.get<GetProfileParams, undefined, GetProfileResponseBody>(
    `${BASE_URL}/worker/:workerId/profile`,
    ({ params }) => {
      const { workerId } = params;

      if (workerId !== WORKER_ID) {
        return HttpResponse.json(
          { error: "Worker not found" },
          { status: 404 }
        );
      }

      return HttpResponse.json(mockProfile);
    }
  ),
];
