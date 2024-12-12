import Card from "../Card";
import styles from "../../styles/components/_jobMatchCard.module.scss";
import { GoChevronRight } from "react-icons/go";

type InfoSectionCardProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  href?: string;
};

const InfoSection: React.FC<InfoSectionCardProps> = ({
  children,
  icon,
  href,
  title,
}) => {
  return (
    <Card.Section className={styles.section} href={href}>
      <div className={styles.section__icon}>{icon}</div>
      <div className={styles.section__main}>
        <p className={styles.section__title}>{title}</p>
        <div className={styles.section__text}>{children}</div>
      </div>
      {href ? (
        <div className={styles.section__chevron}>
          <GoChevronRight size={30} />
        </div>
      ) : null}
    </Card.Section>
  );
};

export default InfoSection;
