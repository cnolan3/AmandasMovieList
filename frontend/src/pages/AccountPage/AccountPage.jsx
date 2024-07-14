import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UpdatePasswordForm from "../../components/Sections/UpdatePasswordForm/UpdatePasswordForm";
import Button from "../../components/UI/Button/Button";
import SlideTransition from "../../components/UI/SlideTransition/SlideTransition";
import { useLoadingOverlay } from "../../contexts/loadingOverlayContext";
import { useUser } from "../../contexts/userContext";
import { useLogout } from "../../hooks/useAuth";
import colors from "../../sass/colors.module.scss";
import ProtectedPage from "../ProtectedPage/ProtectedPage";
import styles from "./AccountPage.module.scss";

function AccountPage() {
  const { setIsLoading } = useLoadingOverlay();
  const { logout, status: logoutStatus } = useLogout();
  const navigate = useNavigate();
  const { myInfo, loggedIn } = useUser();
  const [stage, setStage] = useState(true);

  useEffect(() => {
    setIsLoading(logoutStatus === "pending", colors.colorAccent);
  }, [logoutStatus, setIsLoading]);

  function handleLogout() {
    logout(
      {},
      {
        onSuccess: () => navigate("/"),
      },
    );
  }

  return (
    <ProtectedPage>
      <div className={styles.account}>
        <div className={styles.exitRow}>
          <Link to="/" className={styles.exitBtn}>
            <GrClose size={30} color={colors.colorText} />
          </Link>
        </div>
        <SlideTransition stageState={stage}>
          <div className={styles.accountContainer}>
            {stage ? (
              <>
                <h2>Account Info</h2>
                <div className={styles.userInfoSection}>
                  <h3 className={styles.infoTag}>Username:</h3>
                  <p className={styles.info}>
                    {loggedIn ? myInfo.username : ""}
                  </p>
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
                <UpdatePasswordForm />
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
    </ProtectedPage>
  );
}

export default AccountPage;

