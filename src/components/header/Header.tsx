import Logo from "./Logo";
import styles from "../../styles/layout/header/_header.module.scss";
import WorkerName from "./WorkerName";
import useWorker from "../../hooks/useWorker";
import { createFullName } from "../../lib/utils/createFullName";
import Loader from "../Loader";

const Header = () => {
  const { profile, loading, error } = useWorker(import.meta.env.VITE_WORKER_ID);

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Logo />
        {error ? (
          <p className={styles.header__error}>Error: Could not fetch profile</p>
        ) : loading ? (
          <Loader />
        ) : (
          <WorkerName
            name={createFullName(profile?.firstName, profile?.lastName)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
