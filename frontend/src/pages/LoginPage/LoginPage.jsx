import { SlClose } from "react-icons/sl";
import { Link } from "react-router-dom";

import LoginForm from "../../components/LoginForm/LoginForm";
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
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
