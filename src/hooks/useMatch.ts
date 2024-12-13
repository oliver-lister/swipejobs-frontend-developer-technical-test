import { useState, useCallback } from "react";
import apiService from "../services/apiService";

const useMatch = (workerId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [rejected, setRejected] = useState<boolean>(false);

  const acceptJob = useCallback(
    async (jobId: string) => {
      setLoading(true);
      setError(null);
      try {
        if (!workerId) throw new Error("Worker is not logged in");
        await apiService.acceptJob(workerId, jobId);
        setAccepted(true);
        setRejected(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    },
    [workerId]
  );

  const rejectJob = useCallback(
    async (jobId: string) => {
      setLoading(true);
      setError(null);
      try {
        if (!workerId) throw new Error("Worker is not logged in");
        await apiService.rejectJob(workerId, jobId);
        setRejected(true);
        setAccepted(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    },
    [workerId]
  );

  return {
    loading,
    acceptJob,
    rejectJob,
    accepted,
    rejected,
    error,
  };
};

export default useMatch;
