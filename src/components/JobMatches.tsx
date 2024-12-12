import React from "react";
import { WorkerMatch } from "../lib/types/workerTypes";
import Card from "./Card";
import styles from "../styles/components/_jobMatches.module.scss";
import Skeleton from "./Skeleton";

type JobMatchesProps = {
  matches: WorkerMatch[];
  loading: boolean;
};

const JobMatches: React.FC<JobMatchesProps> = ({ matches, loading }) => {
  return (
    <section className={styles.matches}>
      {loading
        ? Array.from({ length: 4 }).map(() => <Skeleton />)
        : matches.map((match) => (
            <Card>
              <Card.Image
                src={match.jobTitle.imageUrl}
                alt={match.jobTitle.name}
              />
              <Card.Header
                jobTitleName={match.jobTitle.name}
                companyName={match.company.name}
              />
              <Card.Body>
                <Card.Body.Hero
                  distance={match.milesToTravel.toFixed(1)}
                  hourlyRate={(match.wagePerHourInCents / 100).toFixed(2)}
                />
              </Card.Body>
            </Card>
          ))}
    </section>
  );
};

export default JobMatches;
