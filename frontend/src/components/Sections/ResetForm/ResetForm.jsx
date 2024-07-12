import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useResetPassword } from "../../../hooks/useAuth";
import Button from "../../UI/Button/Button";
import FormRow from "../../UI/FormRow/FormRow";
import styles from "./ResetForm.module.scss";

function ResetForm({ onSubmit, onSuccess }) {
  const { resetToken } = useParams();
  console.log("reset token", resetToken);
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { status, resetPassword } = useResetPassword();
  const { errors } = formState;

  function handleReset(data) {
    const { newPassword, newPasswordConfirm } = data;
    onSubmit();

    resetPassword(
      { resetToken, newPassword, newPasswordConfirm },
      {
        onSuccess: () => onSuccess(),
      },
    );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <form
      className={styles.resetForm}
      onSubmit={handleSubmit(handleReset, onError)}
    >
      <FormRow label="New Password" error={errors?.newPassword?.message}>
        <input
          type="password"
          id="newPassword"
          autoCorrect="off"
          {...register("newPassword", {
            required: "New password is required",
            validate: (value) =>
              value.length >= 8 || "Must be 8 or more characters",
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm New Password"
        error={errors?.newPasswordConfirm?.message}
      >
        <input
          type="password"
          id="newPasswordConfirm"
          autoCorrect="off"
          {...register("newPasswordConfirm", {
            required: "Password confirm is required",
            validate: (value) =>
              value === getValues().newPassword || "Does not match password",
          })}
        />
      </FormRow>

      <div className={styles.submitRow}>
        <Button className={styles.submitBtn}>Reset Password</Button>
      </div>
    </form>
  );
}

export default ResetForm;

