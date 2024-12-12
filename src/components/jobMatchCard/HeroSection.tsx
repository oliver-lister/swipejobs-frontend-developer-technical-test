import Card from "../Card";
import styles from "../../styles/components/_jobMatchCard.module.scss";

type HeroSectionProps = {
  wage: string;
  milesToOneDecimal: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  wage,
  milesToOneDecimal,
}) => {
  return (
    <Card.Section className={styles.hero__inner}>
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
  );
};

export default HeroSection;
