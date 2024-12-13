import React from "react";
import styles from "../styles/components/_card.module.scss";
import { NavLink } from "react-router";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

type CardComponent = React.FC<CardProps> & {
  Image: React.FC<CardImageProps>;
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Group: React.FC<CardGroupProps>;
  Section: React.FC<CardSectionProps>;
  Footer: React.FC<CardFooterProps>;
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
  className?: string;
};

const CardHeader: React.FC<CardHeaderProps> = ({
  jobTitleName,
  companyName,
  className = "",
}) => {
  return (
    <div className={`${styles.header} ${className}`}>
      <p className={styles.header__title}>{jobTitleName}</p>
      <p className={styles.header__company}>{companyName}</p>
    </div>
  );
};

type CardBodyProps = {
  children: React.ReactNode;
  className?: string;
};

const CardBody: React.FC<CardBodyProps> = ({ children, className = "" }) => {
  return <div className={`${styles.body} ${className}`}>{children}</div>;
};

type CardGroupProps = {
  children: React.ReactNode;
  className?: string;
};

const CardGroup: React.FC<CardGroupProps> = ({ children, className = "" }) => {
  return <div className={`${styles.group} ${className}`}>{children}</div>;
};

type CardSectionProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

const CardSection: React.FC<CardSectionProps> = ({
  children,
  className = "",
  href,
}) => {
  if (href)
    return (
      <NavLink
        to={href}
        className={`${styles.section} ${styles.link} ${className}`}
      >
        {children}
      </NavLink>
    );
  return <div className={`${styles.section} ${className}`}>{children}</div>;
};

type CardFooterProps = {
  children: React.ReactNode;
  className?: string;
};

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
}) => {
  return <div className={`${styles.footer} ${className}`}>{children}</div>;
};

Card.Image = CardImage;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Group = CardGroup;
Card.Section = CardSection;
Card.Footer = CardFooter;

export default Card;
