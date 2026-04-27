import styles from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.app}>
      <Sidebar />

      <div className={styles.main}>
        <Header />
        <div className={styles.page}>{children}</div>
      </div>
    </div>
  );
}