import React from "react";
import { WorkerMatch } from "../lib/types/workerTypes";
import Card from "./Card";
import styles from "../styles/components/_jobMatches.module.scss";

type JobMatchesProps = {
  matches: WorkerMatch[];
};

const JobMatches: React.FC<JobMatchesProps> = ({ matches }) => {
  return (
    <section className={styles.matches}>
      {matches.map((match) => (
        <Card>
          <Card.Image src={match.jobTitle.imageUrl} alt={match.jobTitle.name} />
        </Card>
      ))}
    </section>
  );
};

export default JobMatches;
