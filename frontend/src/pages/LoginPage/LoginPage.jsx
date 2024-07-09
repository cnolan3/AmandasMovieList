import { SlClose } from "react-icons/sl";
import { Link } from "react-router-dom";

import colors from "../../sass/colors.module.scss";
import styles from "./LoginPage.module.scss";

function LoginPage() {
  return (
    <div className={styles.login}>
      <div className={styles.exitRow}>
        <Link to="/" className={styles.exitBtn}>
          <SlClose size={30} color={colors.colorText} />
        </Link>
      </div>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
      </div>
    </div>
  );
}

export default LoginPage;
