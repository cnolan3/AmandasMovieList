import { useOutletContext } from "react-router-dom";

import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginSubPage.module.scss";

function LoginSubPage() {
  const [onSubmit] = useOutletContext();
  return <LoginForm onSubmit={(data) => onSubmit(data)} />;
}

export default LoginSubPage;

