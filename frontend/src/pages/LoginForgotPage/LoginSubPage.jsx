import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginSubPage.module.scss";

function LoginSubPage() {
  const [onSubmit] = useOutletContext();
  return (
    <>
      <LoginForm onSubmit={(data) => onSubmit(data)} />
      <Link className={styles.forgotLink} to="/forgotpassword">
        Forgot Password
      </Link>
    </>
  );
}

export default LoginSubPage;

