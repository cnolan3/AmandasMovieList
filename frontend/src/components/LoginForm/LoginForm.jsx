import { useForm } from "react-hook-form";

import Button from "../Button/Button";
import FormRow from "../FormRow/FormRow";
import styles from "./LoginForm.module.scss";

function LoginForm({ onSubmit }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  function onError(error) {}

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label="Username" error={errors?.username?.message}>
        <input
          type="text"
          id="username"
          autoCorrect="off"
          {...register("username", { required: "Username is required" })}
        />
      </FormRow>

      <FormRow label="Password" error={errors?.password?.message}>
        <input
          type="password"
          id="password"
          autoCorrect="off"
          {...register("password", { required: "Password is required" })}
        />
      </FormRow>

      <div className={styles.submitRow}>
        <Button className={styles.submitBtn}>Login</Button>
      </div>
    </form>
  );
}

export default LoginForm;

