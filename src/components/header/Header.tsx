import Logo from "./Logo";
import styles from "../../styles/layout/header/_header.module.scss";
import WorkerName from "./WorkerName";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Logo />
        <WorkerName name={"Jim Rose"} />
      </div>
    </header>
  );
};

export default Header;
