import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../hooks/useAuth";
import styles from "./LoginForm.module.scss";

function LoginForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const { isLoading, login } = useLogin();

  function onSubmit(data) {
    login(
      { username: data.username, password: data.password },
      { onSuccess: () => navigate("/") },
    );
  }

  function onError(error) {}

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className={styles.loginField}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoCorrect="off"
          {...register("username", { required: "Username is required" })}
        />
      </div>

      <div className={styles.loginField}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoCorrect="off"
          {...register("password", { required: "Password is required" })}
        />
      </div>

      <div className={styles.submitRow}>
        <button className={styles.submitBtn}>Login</button>
      </div>
    </form>
  );
}

export default LoginForm;

