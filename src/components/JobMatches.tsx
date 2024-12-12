import React from "react";
import { WorkerMatch } from "../lib/types/workerTypes";
import styles from "../styles/components/_jobMatches.module.scss";
import Skeleton from "./Skeleton";
import JobMatchCard from "./jobMatchCard/JobMatchCard";

type JobMatchesProps = {
  matches: WorkerMatch[];
  loading: boolean;
  timeZone?: string;
};

const JobMatches: React.FC<JobMatchesProps> = ({
  matches,
  loading,
  timeZone,
}) => {
  return (
    <section className={styles.matches}>
      {loading
        ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} />)
        : matches.map((match) => (
            <JobMatchCard key={match.jobId} match={match} timeZone={timeZone} />
          ))}
    </section>
  );
};

export default JobMatches;
