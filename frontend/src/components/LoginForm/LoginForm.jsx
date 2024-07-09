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
          {...register("username", { required: "Username is required" })}
        />
      </div>

      <div className={styles.loginField}>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          {...register("password", { required: "Password is required" })}
        />
      </div>
    </form>
  );
}

export default LoginForm;

