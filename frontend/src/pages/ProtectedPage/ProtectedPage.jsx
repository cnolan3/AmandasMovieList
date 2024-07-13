import { useNavigate } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import { useUser } from "../../contexts/userContext";
import styles from "./ProtectedPage.module.scss";

function ProtectedPage({ children, roles = [] }) {
  const { myInfo, loggedIn } = useUser();
  const navigate = useNavigate();

  let isAuth = true;
  if (loggedIn && roles.length > 0) isAuth = roles.includes(myInfo.role);

  return (
    <>
      {loggedIn ? (
        isAuth ? (
          children
        ) : (
          <div className={styles.protected}>
            <h2>You are not authorized for this page</h2>
          </div>
        )
      ) : (
        <div className={styles.protected}>
          <h2>You are not logged in</h2>
          <Button
            className={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Go To Login
          </Button>
          <Button className={styles.homeBtn} onClick={() => navigate("/")}>
            Go To Home
          </Button>
        </div>
      )}
    </>
  );
}

export default ProtectedPage;

