import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

import { useUser } from "../../../contexts/userContext";
import { useLogout } from "../../../hooks/useAuth";
import colors from "../../../sass/colors.module.scss";
import Button from "../../UI/Button/Button";
import FadeTransition from "../../UI/FadeTransition/FadeTransition";
import styles from "./NavBar.module.scss";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { status, logout } = useLogout();
  const { myInfo, loggedIn } = useUser();

  function handleLogout() {
    logout();
  }

  if (!loggedIn) return;

  return (
    <nav className={`${styles.navBar} ${open ? styles.open : ""}`}>
      <div className={styles.menuContentContainer}>
        <FadeTransition stageState={open}>
          {open && (
            <div className={styles.menuContent}>
              <Link
                className={styles.menuItem}
                onClick={() => setOpen(false)}
                to="/addmovie"
              >
                <FaArrowRight color={colors.colorBackground} size={20} />
                Add a movie to the list
              </Link>
              {/* TODO: add invite link system */}
              {/* <Link className={styles.menuItem}>
              <FaArrowRight color={colors.colorBackground} size={20} />
                Send invite link
              </Link> */}

              <div className={styles.logoutBtnContainer}>
                <FadeTransition stageState={openConfirm}>
                  <Link
                    className={`${styles.menuItem} ${styles.logout}`}
                    onClick={() =>
                      setOpenConfirm((openConfirm) => !openConfirm)
                    }
                  >
                    {openConfirm ? (
                      <>
                        <span>Cancel</span>
                        <Button
                          className={styles.logoutConfirmBtn}
                          onClick={handleLogout}
                        >
                          Confirm Logout
                        </Button>
                      </>
                    ) : (
                      <span>Logout</span>
                    )}
                  </Link>
                </FadeTransition>
              </div>
            </div>
          )}
        </FadeTransition>
      </div>
      <div className={styles.btnContainer}>
        <FadeTransition stageState={open}>
          <div
            className={styles.openCloseBtn}
            onClick={() => setOpen((open) => !open)}
          >
            {open ? (
              <IoClose color={colors.colorBackground} size={45} />
            ) : (
              <IoMenu color={colors.colorBackground} size={45} />
            )}
          </div>
        </FadeTransition>
      </div>
    </nav>
  );
}

export default NavBar;
