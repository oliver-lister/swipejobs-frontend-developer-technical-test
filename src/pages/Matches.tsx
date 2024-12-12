import JobMatches from "../components/JobMatches";
import useWorker from "../hooks/useWorker";

const Matches = () => {
  const { matches, loading, profile } = useWorker(
    import.meta.env.VITE_WORKER_ID
  );

  return (
    <JobMatches
      matches={matches}
      loading={loading}
      timeZone={profile?.address.zoneId}
    />
  );
};

export default Matches;
