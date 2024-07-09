import { Link } from "react-router-dom";

import { useSearch } from "../../contexts/searchContext";
import styles from "./HeaderSection.module.scss";

function HeaderSection() {
  const { placeholder, setQuery } = useSearch();
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.loginRow}>
          <h2>Amandas Movie List</h2>
          <Link className={`${styles.btn} ${styles.btnLogin}`} to="/login">
            login
          </Link>
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
