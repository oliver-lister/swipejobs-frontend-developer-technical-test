import logoImage from "../../assets/images/swipejobs_logo_transparent_white.png";
import styles from "../../styles/layout/header/_logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logoImage} alt="swipejobs Logo" width={175} />
    </div>
  );
};

export default Logo;
