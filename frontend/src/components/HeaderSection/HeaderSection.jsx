import { useSearch } from "../../contexts/searchContext";
import styles from "./HeaderSection.module.scss";

function HeaderSection() {
  const { query, placeholder, setQuery } = useSearch();
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.loginRow}>
          <h2>Amandas Movie List</h2>
          <button className={`${styles.btn} ${styles.btnLogin}`}>login</button>
        </div>
        <div className={styles.searchRow}>
          <input
            placeholder={placeholder}
            className={styles.search}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
