import styles from "../styles/components/_card.module.scss";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

type CardComponent = React.FC<CardProps> & {
  Image: React.FC<CardImageProps>;
  Header: React.FC<CardHeaderProps>;
  Body: CardBodyComponent;
};

const Card: CardComponent = ({ children, className = "", ...props }) => {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  );
};

type CardImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const CardImage: React.FC<CardImageProps> = ({ src, alt, className = "" }) => {
  return (
    <div className={`${styles.image} ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
};

type CardHeaderProps = {
  jobTitleName: string;
  companyName: string;
};

const CardHeader: React.FC<CardHeaderProps> = ({
  jobTitleName,
  companyName,
}) => {
  return (
    <div className={styles.header}>
      <p className={styles.header__title}>{jobTitleName}</p>
      <p className={styles.header__company}>{companyName}</p>
    </div>
  );
};

type CardBodyProps = { children: React.ReactNode; className?: string };

type CardBodyComponent = React.FC<CardBodyProps> & {
  Hero: React.FC<CardBodyHeroProps>;
  Section: React.FC<CardBodySectionProps>;
};

const CardBody: CardBodyComponent = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`${styles.body} ${className}`} {...props}>
      {children}
    </div>
  );
};

type CardBodyHeroProps = {
  distance: string;
  hourlyRate: string;
  className?: string;
};

const CardBodyHero: React.FC<CardBodyHeroProps> = ({
  distance,
  hourlyRate,
  className = "",
  ...props
}) => {
  return (
    <div className={`${styles.hero} ${className}`} {...props}>
      <div className={styles.hero__left}>
        <p className={styles.hero__title}>Distance</p>
        <p className={styles.hero__amount}>{distance} miles</p>
      </div>
      <div className={styles.hero__right}>
        <p className={styles.hero__title}>Hourly Rate</p>
        <p className={styles.hero__amount}>
          <span className={styles.hero__sign}>$</span>
          {hourlyRate}
        </p>
      </div>
    </div>
  );
};

type CardBodySectionProps = { children: React.ReactNode; className?: string };

const CardBodySection: React.FC<CardBodySectionProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`${styles.body__section} ${className}`} {...props}>
      {children}
    </div>
  );
};

CardBody.Hero = CardBodyHero;
CardBody.Section = CardBodySection;

Card.Image = CardImage;
Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
