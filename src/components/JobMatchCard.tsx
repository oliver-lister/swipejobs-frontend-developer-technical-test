import { WorkerMatch } from "../lib/types/workerTypes";
import Card from "./Card";
import styles from "../styles/components/_jobMatchCard.module.scss";
import { formatShift } from "../lib/utils/formatShift";

type JobMatchCardProps = {
  match: WorkerMatch;
  timeZone?: string;
};

const JobMatchCard: React.FC<JobMatchCardProps> = ({ match, timeZone }) => {
  const wage = (match.wagePerHourInCents / 100).toFixed(2);
  const milesToOneDecimal = match.milesToTravel.toFixed(1);

  return (
    <Card key={match.jobId}>
      <Card.Image src={match.jobTitle.imageUrl} alt={match.jobTitle.name} />
      <Card.Header
        jobTitleName={match.jobTitle.name}
        companyName={match.company.name}
      />
      <Card.Body>
        <Card.Group>
          <Card.Section className={styles.hero}>
            <div className={styles.hero__left}>
              <p className={styles.hero__title}>Distance</p>
              <p className={styles.hero__amount}>{milesToOneDecimal} miles</p>
            </div>
            <div className={styles.hero__right}>
              <p className={styles.hero__title}>Hourly Rate</p>
              <p className={styles.hero__amount}>
                <span className={styles.hero__sign}>$</span>
                {wage}
              </p>
            </div>
          </Card.Section>
        </Card.Group>
        <Card.Group>
          <Card.Section>
            <div>
              <p>Icon</p>
              {/* <img /> */}
            </div>
            <div>
              <p>Shift Dates</p>
              {match.shifts.map((shift) => (
                <p key={shift.startDate}>
                  {formatShift(shift.startDate, shift.endDate, timeZone)}
                </p>
              ))}
            </div>
            <div>
              <p>{">"}</p>
            </div>
          </Card.Section>
        </Card.Group>
      </Card.Body>
    </Card>
  );
};

export default JobMatchCard;
