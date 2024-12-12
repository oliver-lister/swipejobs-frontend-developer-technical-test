import { Outlet } from "react-router";
import Header from "../components/header/Header";
import styles from "../styles/layout/rootLayout.module.scss";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.main__inner}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default RootLayout;
