import styles from "./MainSection.module.css";

function MainSection({ children }) {
    return <main className={styles.main}>{children}</main>;
}

export default MainSection;
