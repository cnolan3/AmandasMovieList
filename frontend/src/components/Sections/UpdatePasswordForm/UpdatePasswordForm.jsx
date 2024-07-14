import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLoadingOverlay } from "../../../contexts/loadingOverlayContext";
import { useUpdatePassword } from "../../../hooks/useAuth";
import colors from "../../../sass/colors.module.scss";
import Button from "../../UI/Button/Button";
import FormRow from "../../UI/FormRow/FormRow";
import styles from "./UpdatePasswordForm.module.scss";

function UpdatePasswordForm({ onSubmit = () => {}, onSuccess = () => {} }) {
  const { setIsLoading } = useLoadingOverlay();
  const { updatePassword, status } = useUpdatePassword();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  useEffect(() => {
    setIsLoading(status === "pending", colors.colorAccent);
  }, [status, setIsLoading]);

  function handleUpdatePassword(data) {
    const { currentPassword, newPassword, newPasswordConfirm } = data;

    onSubmit();

    updatePassword(
      { currentPassword, newPassword, newPasswordConfirm },
      {
        onSuccess: () => {
          onSuccess();
        },
      },
    );
  }

  function onError(error) {}

  return (
    <form
      className={styles.updatePasswordForm}
      onSubmit={handleSubmit(handleUpdatePassword, onError)}
    >
      <FormRow
        label="Current Password"
        error={errors?.currentPassword?.message}
      >
        <input
          type="password"
          id="currentPassword"
          autoCorrect="off"
          {...register("currentPassword", {
            required: "Current password is required",
          })}
        />
      </FormRow>

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
        <Button className={styles.submitBtn}>Update Password</Button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;

