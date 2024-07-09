import { useForm } from "react-hook-form";

import styles from "./LoginForm.module.scss";

function LoginForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  function onSubmit(data) {}

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

