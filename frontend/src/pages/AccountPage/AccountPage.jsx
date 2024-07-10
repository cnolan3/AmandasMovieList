import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Spinner from "../../components/Spinner/Spinner";
import { useLogout } from "../../hooks/useAuth";
import colors from "../../sass/colors.module.scss";
import styles from "./AccountPage.module.scss";

function AccountPage() {
  const { logout, status } = useLogout();
  const navigate = useNavigate();
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

  function handleLogout() {
    setShow(false); // re-render to trigger the timer
    logout(
      {},
      {
        onSuccess: () => {
          clearTimeout(timerId.current);
          navigate("/");
        },
      },
    );
  }

  return (
    <div className={styles.login}>
      {status === "pending" && show && (
        <div className={styles.overlay}>
          <Spinner color={colors.colorAccent} size={20} />
        </div>
      )}
      <div className={styles.exitRow}>
        <Link to="/" className={styles.exitBtn}>
          <GrClose size={30} color={colors.colorText} />
        </Link>
      </div>
      <div className={styles.accountContainer}>
        <div className={styles.logoutRow}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;

