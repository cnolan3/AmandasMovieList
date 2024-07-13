import { HiUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";

import colors from "../../../sass/colors.module.scss";
import styles from "./UserIcon.module.scss";

function UserIcon({ username }) {
  return (
    <Link className={styles.userIconContainer} to="/account">
      <p>{username}</p>
      <HiUserCircle size={30} color={colors.colorAccent} />
    </Link>
  );
}

export default UserIcon;

