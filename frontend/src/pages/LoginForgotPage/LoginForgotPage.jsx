import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import ForgotSection from "../../components/Sections/ForgotSection/ForgotSection";
import LoginForm from "../../components/Sections/LoginForm/LoginForm";
import SlideTransition from "../../components/UI/SlideTransition/SlideTransition";
import Spinner from "../../components/UI/Spinner/Spinner";
import colors from "../../sass/colors.module.scss";
import styles from "./LoginForgotPage.module.scss";

function LoginForgotPage() {
  const navigate = useNavigate();
  const timerId = useRef(null);
  const [startTimer, setStartTimer] = useState(false);
  const [show, setShow] = useState(false);
  const [stage, setStage] = useState(true);

  useEffect(() => {
    // start a timer to show the loading spinner 500ms after hitting 'login'
    if (startTimer) {
      timerId.current = setTimeout(() => {
        setShow(true);
      }, 500);
    }
  }, [startTimer]);

  function handleSubmit() {
    setStartTimer(true); // re-render to trigger the timer
  }

  function handleLoginSuccess() {
    clearTimeout(timerId.current);
    return navigate("/");
  }

  function handleForgotSuccess() {
    clearTimeout(timerId.current);
    setShow(false);
  }

  return (
    <div className={styles.login}>
      {show && (
        <div className={styles.overlay}>
          <Spinner color={colors.colorBackground} size={20} />
        </div>
      )}
      <div className={styles.exitRow}>
        <Link to="/" className={styles.exitBtn}>
          <GrClose size={30} color={colors.colorText} />
        </Link>
      </div>
      <SlideTransition stageState={stage}>
        <div className={styles.loginContainer}>
          {stage ? (
            <>
              <LoginForm
                onSubmit={handleSubmit}
                onSuccess={handleLoginSuccess}
              />
              <a className={styles.forgotLink} onClick={() => setStage(false)}>
                Forgot Password
              </a>
            </>
          ) : (
            <ForgotSection
              onSubmit={handleSubmit}
              onSuccess={handleForgotSuccess}
              onBack={() => setStage(true)}
            />
          )}
        </div>
      </SlideTransition>
    </div>
  );
}

export default LoginForgotPage;
