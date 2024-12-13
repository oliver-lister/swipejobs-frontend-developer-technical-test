import { NavLink } from "react-router";
import logoImage from "../../assets/images/swipejobs_logo_transparent_white.png";
import styles from "../../styles/layout/header/_logo.module.scss";

const Logo = () => {
  return (
    <NavLink to="/" className={styles.logo}>
      <img src={logoImage} alt="swipejobs Logo" width={175} />
    </NavLink>
  );
};

export default Logo;
