import styles from "../styles/components/_jobMatches.module.scss";
import Skeleton from "./Skeleton";
import JobMatchCard from "./jobMatchCard/JobMatchCard";
import useWorker from "../hooks/useWorker";

const JobMatches = () => {
  const { matches, loading, profile } = useWorker(
    import.meta.env.VITE_WORKER_ID
  );

  return (
    <section className={styles.matches}>
      {loading
        ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} />)
        : profile &&
          matches.map((match) => (
            <JobMatchCard
              key={match.jobId}
              match={match}
              workerId={profile.workerId}
              timeZone={profile.address.zoneId}
            />
          ))}
    </section>
  );
};

export default JobMatches;
