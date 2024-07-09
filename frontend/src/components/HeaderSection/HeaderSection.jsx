import { Link } from "react-router-dom";

import { useSearch } from "../../contexts/searchContext";
import { useMyInfo } from "../../hooks/useUser";
import UserIcon from "../UserIcon/UserIcon";
import styles from "./HeaderSection.module.scss";

function HeaderSection() {
  const { placeholder, setQuery } = useSearch();
  const { myInfo, error, status } = useMyInfo();

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.loginRow}>
          <h2>Amandas Movie List</h2>
          {status === "success" ? (
            <UserIcon username={myInfo.username} />
          ) : (
            <Link className={`${styles.btn} ${styles.btnLogin}`} to="/login">
              Login
            </Link>
          )}
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
