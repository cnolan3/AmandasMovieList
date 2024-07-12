import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UpdatePasswordForm from "../../components/Sections/UpdatePasswordForm/UpdatePasswordForm";
import Button from "../../components/UI/Button/Button";
import SlideTransition from "../../components/UI/SlideTransition/SlideTransition";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useUser } from "../../contexts/userContext";
import { useLogout } from "../../hooks/useAuth";
import { useUpdatePassword } from "../../hooks/useAuth";
import colors from "../../sass/colors.module.scss";
import styles from "./AccountPage.module.scss";

function AccountPage() {
  const { logout, status: logoutStatus } = useLogout();
  const { updatePassword, status: updateStatus } = useUpdatePassword();
  const navigate = useNavigate();
  const timerId = useRef(null);
  const [show, setShow] = useState(true);
  const { myInfo, loggedIn } = useUser();
  const [stage, setStage] = useState(true);

  useEffect(() => {
    // start a timer to show the loading spinner 500ms after hitting 'login'
    if (!show) {
      timerId.current = setTimeout(() => {
        setShow(true);
      }, 500);
    }
  }, [show]);

  function handleLogout() {
    setShow(false); // re-render to trigger the timer
    logout(
      {},
      {
        onSuccess: () => {
          clearTimeout(timerId.current);
          return navigate("/");
        },
      },
    );
  }

  function handleUpdatePassword(data) {
    const { currentPassword, newPassword, newPasswordConfirm } = data;
    setShow(false);
    updatePassword(
      { currentPassword, newPassword, newPasswordConfirm },
      {
        onSuccess: () => {
          clearTimeout(timerId.current);
          return setStage(false);
        },
      },
    );
  }

  return (
    <div className={styles.account}>
      {(logoutStatus === "pending" || updateStatus === "pending") && show && (
        <div className={styles.overlay}>
          <Spinner color={colors.colorAccent} size={20} />
        </div>
      )}
      <div className={styles.exitRow}>
        <Link to="/" className={styles.exitBtn}>
          <GrClose size={30} color={colors.colorText} />
        </Link>
      </div>

      <SlideTransition stageState={stage}>
        <div className={styles.accountContainer}>
          {stage ? (
            <>
              <div className={styles.userInfoSection}>
                <h3 className={styles.infoTag}>Username:</h3>
                <p className={styles.info}>{loggedIn ? myInfo.username : ""}</p>
                <h3 className={styles.infoTag}>Email:</h3>
                <p className={styles.info}>{loggedIn ? myInfo.email : ""}</p>
              </div>
              <div className={styles.btnSection}>
                <Button
                  className={styles.updatePasswordBtn}
                  onClick={() => setStage(false)}
                >
                  Update Password
                  <FaArrowRight />
                </Button>
                <Button className={styles.logoutBtn} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <UpdatePasswordForm
                onSubmit={(data) => handleUpdatePassword(data)}
              />
              <Button
                className={styles.cancelUpdateBtn}
                onClick={() => setStage(true)}
              >
                <FaArrowLeft />
                Cancel
              </Button>
            </>
          )}
        </div>
      </SlideTransition>
    </div>
  );
}

export default AccountPage;

