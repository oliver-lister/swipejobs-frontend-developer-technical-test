import styles from "../styles/components/_skeleton.module.scss";

const Skeleton = () => {
  return (
    <span
      className={styles.skeleton}
      aria-label="Skeleton"
      data-testid="skeleton"
    />
  );
};

export default Skeleton;
