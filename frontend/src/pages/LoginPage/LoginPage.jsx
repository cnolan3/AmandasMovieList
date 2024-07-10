import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LoginForm from "../../components/LoginForm/LoginForm";
import Spinner from "../../components/Spinner/Spinner";
import { useLogin } from "../../hooks/useAuth";
import colors from "../../sass/colors.module.scss";
import styles from "./LoginPage.module.scss";

function LoginPage() {
  const navigate = useNavigate();
  const { status, login } = useLogin();
  const timerId = useRef(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // start a timer to show the loading spinner 500ms after hitting 'login'
    if (!show) {
      timerId.current = setTimeout(() => {
        setShow(true);
      }, 500);
    }
  }, [show]);

  function onSubmit(data) {
    setShow(false); // re-render to trigger the timer
    login(
      { username: data.username, password: data.password },
      {
        onSuccess: () => {
          clearTimeout(timerId.current);
          return navigate("/");
        },
      },
    );
  }

  return (
    <div className={styles.login}>
      {show && status === "pending" && (
        <div className={styles.overlay}>
          <Spinner color={colors.colorBackground} size={20} />
        </div>
      )}
      <div className={styles.exitRow}>
        <Link to="/" className={styles.exitBtn}>
          <GrClose size={30} color={colors.colorText} />
        </Link>
      </div>
      <div className={styles.loginContainer}>
        <LoginForm onSubmit={(data) => onSubmit(data)} />
      </div>
    </div>
  );
}

export default LoginPage;
