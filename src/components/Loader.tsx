import styles from "../styles/components/_loader.module.scss";

type LoaderProps = {
  size?: number;
};

const Loader: React.FC<LoaderProps> = ({ size = 20 }) => {
  return (
    <span
      className={styles.loader}
      aria-label="Loading"
      style={{ width: size, height: size }}
    />
  );
};

export default Loader;
