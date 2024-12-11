import axios from "axios";

class ApiService {
  client;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
  }

  async getWorkerProfile(workerId: string) {
    try {
      const response = await this.client.get(`/worker/${workerId}/profile`);
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to fetch profile");
    }
  }

  async getWorkerMatches(workerId: string) {
    try {
      const response = await this.client.get(`/worker/${workerId}/matches`);
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to fetch matches");
    }
  }

  async acceptJob(workerId: string, jobId: string) {
    try {
      const response = await this.client.post(
        `/worker/${workerId}/job/${jobId}/accept`
      );
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to accept job");
    }
  }

  async rejectJob(workerId: string, jobId: string) {
    try {
      const response = await this.client.post(
        `/worker/${workerId}/job/${jobId}/reject`
      );
      return response.data;
    } catch (error) {
      this.handleError(error, "Failed to reject job");
    }
  }

  handleError(error: unknown, customMessage: string): never {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `${customMessage}: ${error.response.status} - ${error.response.data}`
      );
    } else {
      console.error(
        customMessage,
        error instanceof Error ? error.message : String(error)
      );
    }
    throw new Error(customMessage || "An unknown error occurred.");
  }
}

export default new ApiService("https://test.swipejobs.com/api");
