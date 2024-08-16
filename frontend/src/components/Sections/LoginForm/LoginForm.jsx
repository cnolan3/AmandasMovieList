import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLoadingOverlay } from "../../../contexts/loadingOverlayContext";
import { useLogin } from "../../../hooks/useAuth";
import Button from "../../UI/Button/Button";
import FormRow from "../../UI/FormRow/FormRow";
import styles from "./LoginForm.module.scss";

function LoginForm({ onSubmit = () => {}, onSuccess = () => {} }) {
  const { setIsLoading } = useLoadingOverlay();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { status, login } = useLogin();
  const { errors } = formState;

  useEffect(() => {
    setIsLoading(status === "pending");
  }, [status, setIsLoading]);

  function handleLogin(data) {
    onSubmit();
    login(
      { username: data.username, password: data.password },
      {
        onSuccess: () => {
          return onSuccess();
        },
      },
    );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <form
      className={styles.loginForm}
      // onSubmit={onSubmit()}
      onSubmit={handleSubmit(handleLogin, onError)}
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
