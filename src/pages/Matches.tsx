import JobMatches from "../components/JobMatches";
import useWorker from "../hooks/useWorker";

const Matches = () => {
  const { matches, loading } = useWorker(import.meta.env.VITE_WORKER_ID);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <JobMatches matches={matches} />;
};

export default Matches;
