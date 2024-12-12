import styles from "../styles/components/_button.module.scss";

type ButtonProps = {
  variant?: "accent" | "outline";
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  variant = "accent",
  children,
  ...props
}) => {
  return (
    <button className={`${styles[variant]} ${styles.button}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
