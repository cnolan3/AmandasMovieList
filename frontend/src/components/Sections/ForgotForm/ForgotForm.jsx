import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLoadingOverlay } from "../../../contexts/loadingOverlayContext";
import { useForgotPassword } from "../../../hooks/useAuth";
import Button from "../../UI/Button/Button";
import FormRow from "../../UI/FormRow/FormRow";
import styles from "./ForgotForm.module.scss";

function ForgotForm({ onSubmit = () => {}, onSuccess = () => {} }) {
  const { setIsLoading } = useLoadingOverlay();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { forgotPassword, status } = useForgotPassword();
  const { errors } = formState;

  useEffect(() => {
    setIsLoading(status === "pending");
  }, [status, setIsLoading]);

  function handleForgot(data) {
    onSubmit();
    forgotPassword(data.email, {
      onSuccess: () => {
        return onSuccess();
      },
    });
  }

  function onError(error) {}

  return (
    <form
      className={styles.forgotForm}
      onSubmit={handleSubmit(handleForgot, onError)}
    >
      <FormRow label="Email" error={errors?.email?.message}>
        <input
          type="text"
          id="email"
          autoCorrect="off"
          {...register("email", {
            required: "Provide email associated with the account",
          })}
        />
      </FormRow>

      <div className={styles.submitRow}>
        <Button className={styles.submitBtn}>Send Reset Request</Button>
      </div>
    </form>
  );
}

export default ForgotForm;
