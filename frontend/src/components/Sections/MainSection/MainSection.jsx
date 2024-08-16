import styles from "./MainSection.module.scss";

function MainSection({ children }) {
  return (
    <main className={styles.main}>
      <div className={styles.mainContent}>{children}</div>
    </main>
  );
}

export default MainSection;
