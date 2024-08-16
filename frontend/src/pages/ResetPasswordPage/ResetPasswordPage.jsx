import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ResetForm from "../../components/Sections/ResetForm/ResetForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import colors from "../../sass/colors.module.scss";
import styles from "./ResetPasswordPage.module.scss";

function ResetPasswordPage() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const timerId = useRef(null);
  const [startTimer, setStartTimer] = useState(false);
  const [show, setShow] = useState(false);

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

  function handleSuccess() {
    clearTimeout(timerId.current);
    return navigate("/");
  }

  return (
    <div className={styles.reset}>
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
      <div className={styles.resetContainer}>
        <ResetForm onSubmit={handleSubmit} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
