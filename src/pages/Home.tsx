import { NavLink } from "react-router";
import styles from "../styles/pages/_home.module.scss";

const Home = () => {
  return (
    <>
      <p>
        Welcome to <span>swipejobs</span>
      </p>
      <NavLink to="/matches" className={styles.link}>
        Click Here To View Your Job Matches
      </NavLink>
    </>
  );
};

export default Home;
