import { useState, useEffect } from "react";
import apiService from "../services/apiService";
import { Job, WorkerProfile } from "../lib/types/workerTypes";

const useWorker = (workerId: string) => {
  const [profile, setProfile] = useState<WorkerProfile | null>(null);
  const [matches, setMatches] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkerData = async () => {
      setLoading(true);
      setError(null);
      try {
        const profileData = await apiService.getWorkerProfile(workerId);
        const matchesData = await apiService.getWorkerMatches(workerId);
        setProfile(profileData);
        setMatches(matchesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, [workerId]);

  return { profile, matches, loading, error };
};

export default useWorker;
