import styles from "./MainSection.module.scss";

function MainSection({ children }) {
  return <main className={styles.main}>{children}</main>;
}

export default MainSection;
