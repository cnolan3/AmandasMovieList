import { HiUserCircle } from "react-icons/hi2";

import colors from "../../sass/colors.module.scss";
import styles from "./UserIcon.module.scss";

function UserIcon({ username }) {
  return (
    <div className={styles.userIconContainer}>
      <p>{username}</p>
      <HiUserCircle size={30} color={colors.colorAccent} />
    </div>
  );
}

export default UserIcon;

