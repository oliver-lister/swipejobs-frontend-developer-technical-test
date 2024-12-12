import JobMatches from "../components/JobMatches";
import useWorker from "../hooks/useWorker";

const Matches = () => {
  const { matches, loading } = useWorker(import.meta.env.VITE_WORKER_ID);

  return <JobMatches matches={matches} loading={loading} />;
};

export default Matches;
