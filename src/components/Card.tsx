import styles from "../styles/components/_card.module.scss";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

type CardComponent = React.FC<CardProps> & {
  Image: React.FC<CardImageProps>;
  Header: React.FC<{ children: React.ReactNode; className?: string }>;
  Body: React.FC<{ children: React.ReactNode; className?: string }>;
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
    <div className={`${styles.card__image} ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardBody = ({ children, className = "", ...props }) => {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Image = CardImage;
Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
