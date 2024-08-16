import { Link } from "react-router-dom";

import { useSearch } from "../../../contexts/searchContext";
import { useUser } from "../../../contexts/userContext";
import UserIcon from "../../UI/UserIcon/UserIcon";
import styles from "./HeaderSection.module.scss";

function HeaderSection() {
  const { placeholder, setQuery } = useSearch();
  const { myInfo, loggedIn } = useUser();

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <h2 className={styles.title}>Amanda&apos;s Movie List</h2>

        <div className={styles.loginBox}>
          {loggedIn ? (
            <UserIcon username={myInfo.username} />
          ) : (
            <Link className={`${styles.btn} ${styles.btnLogin}`} to="/login">
              Login
            </Link>
          )}
        </div>

        <div className={styles.searchBox}>
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
