import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import ForgotSection from "../../components/Sections/ForgotSection/ForgotSection";
import LoginForm from "../../components/Sections/LoginForm/LoginForm";
import SlideTransition from "../../components/UI/SlideTransition/SlideTransition";
import colors from "../../sass/colors.module.scss";
import styles from "./LoginForgotPage.module.scss";

function LoginForgotPage() {
  const navigate = useNavigate();

  const [stage, setStage] = useState(true);

  function handleLoginSuccess() {
    return navigate("/");
  }

  return (
    <div className={styles.login}>
      <div className={styles.exitRow}>
        <Link to="/" className={styles.exitBtn}>
          <GrClose size={30} color={colors.colorText} />
        </Link>
      </div>
      <SlideTransition stageState={stage}>
        <div className={styles.loginContainer}>
          {stage ? (
            <>
              <LoginForm onSuccess={handleLoginSuccess} />
              <a className={styles.forgotLink} onClick={() => setStage(false)}>
                Forgot Password
              </a>
            </>
          ) : (
            <ForgotSection onBack={() => setStage(true)} />
          )}
        </div>
      </SlideTransition>
    </div>
  );
}

export default LoginForgotPage;

