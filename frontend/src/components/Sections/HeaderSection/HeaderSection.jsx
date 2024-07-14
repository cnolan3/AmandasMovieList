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
        <div className={styles.loginRow}>
          <h2>Amanda&apos;s Movie List</h2>
          {loggedIn ? (
            <UserIcon username={myInfo.username} />
          ) : (
            <Link className={`${styles.btn} ${styles.btnLogin}`} to="/login">
              Login
            </Link>
          )}
        </div>
        <div className={styles.searchRow}>
          <div
            className={styles.iconAttrib}
            title='<a target="_blank" href="https://icons8.com/icon/59878/search">Search</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>'
          ></div>
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

