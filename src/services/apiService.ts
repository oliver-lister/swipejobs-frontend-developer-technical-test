import axios from "axios";
import { WorkerMatch, WorkerProfile } from "../lib/types/workerTypes";

class ApiService {
  client;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
  }

  async getWorkerProfile(workerId: string): Promise<WorkerProfile> {
    try {
      const response = await this.client.get(`/worker/${workerId}/profile`);
      return response.data;
    } catch (error) {
      this.handleError(
        error,
        `Failed to fetch profile for workerId ${workerId}`
      );
    }
  }

  async getWorkerMatches(workerId: string): Promise<WorkerMatch[]> {
    try {
      const response = await this.client.get(`/worker/${workerId}/matches`);
      return response.data;
    } catch (error) {
      this.handleError(
        error,
        `Failed to fetch matches for workerId ${workerId}`
      );
    }
  }

  private async isJobMatchForWorker(
    workerId: string,
    jobId: string
  ): Promise<string> {
    const matches = await this.getWorkerMatches(workerId);
    const match = matches.find((match) => match.jobId === jobId);
    if (match) return match.jobId;

    throw new Error(
      `No job match found for workerId: ${workerId}, and jobId: ${jobId}`
    );
  }

  async acceptJob(workerId: string, jobId: string) {
    try {
      await this.isJobMatchForWorker(workerId, jobId);
      const response = await this.client.get(
        `/worker/${workerId}/job/${jobId}/accept`
      );
      if (response.data.message) throw response.data.message;
      return response.data;
    } catch (error) {
      this.handleError(error, `Failed to accept job ${jobId}`);
    }
  }

  async rejectJob(workerId: string, jobId: string) {
    try {
      await this.isJobMatchForWorker(workerId, jobId);
      const response = await this.client.get(
        `/worker/${workerId}/job/${jobId}/reject`
      );

      if (response.data.message) throw response.data.message;
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to reject job");
    }
  }

  handleError(error: unknown, customMessage: string): never {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = `${customMessage}: ${error.response.status} - ${error.response.data.message}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      const errorMessage = `${customMessage}: ${
        error instanceof Error ? error.message : String(error)
      }`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export default new ApiService(import.meta.env.VITE_BACKEND_URL);
