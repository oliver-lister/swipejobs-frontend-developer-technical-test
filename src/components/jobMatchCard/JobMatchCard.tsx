import { WorkerMatch } from "../../lib/types/workerTypes";
import Card from "../Card";
import { FaCalendarAlt } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { FaTools } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import HeroSection from "./HeroSection";
import InfoSection from "./InfoSection";
import { formatShift } from "../../lib/utils/formatShift";
import styles from "../../styles/components/_jobMatchCard.module.scss";
import { formatNumber } from "../../lib/utils/formatNumber";
import Button from "../Button";
import useMatch from "../../hooks/useMatch";
import Loader from "../Loader";

type JobMatchCardProps = {
  match: WorkerMatch;
  workerId: string;
  timeZone?: string;
};

const JobMatchCard: React.FC<JobMatchCardProps> = ({
  match,
  timeZone,
  workerId,
}) => {
  const wage = (match.wagePerHourInCents / 100).toFixed(2);

  const milesToDecimalPoint = (decimalPoints: number) =>
    match.milesToTravel.toFixed(decimalPoints);

  const reportTo = `${match.company.reportTo.name} ${
    match.company.reportTo.phone
      ? formatNumber(match.company.reportTo.phone)
      : ""
  }`;

  const { acceptJob, rejectJob, loading, accepted, rejected, error } =
    useMatch(workerId);

  return (
    <Card key={match.jobId} data-testid="job-match-card">
      <Card.Image src={match.jobTitle.imageUrl} alt={match.jobTitle.name} />
      <Card.Body>
        <Card.Header
          jobTitleName={match.jobTitle.name}
          companyName={match.company.name}
        />
        <Card.Group className={styles.hero}>
          <HeroSection wage={wage} milesToOneDecimal={milesToDecimalPoint(1)} />
        </Card.Group>
        <Card.Group>
          <InfoSection title={"Shift Dates"} icon={<FaCalendarAlt size={20} />}>
            {match.shifts.map((shift) => (
              <p key={shift.startDate}>
                {formatShift(shift.startDate, shift.endDate, timeZone)}
              </p>
            ))}
          </InfoSection>
          <InfoSection
            title={"Location"}
            icon={<ImLocation size={20} />}
            href={`/matches/job/${match.jobId}/location`}
          >
            <p>{match.company.address.formattedAddress}</p>
            <p className={styles.section__text_xs}>{`${milesToDecimalPoint(
              2
            )} miles from your job search location`}</p>
          </InfoSection>
          {match.requirements ? (
            <InfoSection title={"Requirements"} icon={<FaTools size={20} />}>
              <ul className={styles.section__list}>
                {match.requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            </InfoSection>
          ) : null}
          <InfoSection
            title={"Report To"}
            icon={<IoPersonCircleOutline size={20} />}
          >
            <p>{reportTo}</p>
          </InfoSection>
        </Card.Group>
      </Card.Body>
      <Card.Footer className={styles.footer}>
        <div className={styles.footer__buttons}>
          <Button
            variant="outline"
            onClick={() => rejectJob(match.jobId)}
            disabled={loading}
          >
            {loading ? <Loader size={20} /> : rejected ? <ImCross /> : null}
            {loading ? "Loading" : rejected ? "Rejected" : "No Thanks"}
          </Button>
          <Button
            variant="accent"
            onClick={() => acceptJob(match.jobId)}
            disabled={loading || accepted}
          >
            {loading ? <Loader size={20} /> : accepted ? <FaCheck /> : null}
            {loading ? "Loading" : accepted ? "Accepted" : "I'll Take It"}
          </Button>
        </div>
        {error ? <p className={styles.error__text}>Error: {error}</p> : null}
      </Card.Footer>
    </Card>
  );
};

export default JobMatchCard;
