import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { useForgotPassword } from "../../../hooks/useAuth";
import colors from "../../../sass/colors.module.scss";
import Button from "../../UI/Button/Button";
import SlideTransition from "../../UI/SlideTransition/SlideTransition";
import ForgotForm from "../ForgotForm/ForgotForm";
import styles from "./ForgotSection.module.scss";

function ForgotSection({ onSubmit, onSuccess, onBack }) {
  const [stage, setStage] = useState(true);
  const { forgotPassword, status } = useForgotPassword();

  function handleSubmit(data) {
    onSubmit();
  }

  function handleSuccess() {
    onSuccess();
    setStage(false);
  }
  return (
    <>
      <SlideTransition stageState={stage}>
        <div className={styles.forgotContainer}>
          {stage ? (
            <>
              <ForgotForm onSubmit={handleSubmit} onSuccess={handleSuccess} />
              <Button className={styles.backBtn} onClick={onBack}>
                <FaArrowLeft color={colors.colorText} size={10} />
                Back
              </Button>
            </>
          ) : (
            <>
              <h2>Password reset request sent</h2>
              <h2>check your email for the reset link</h2>
            </>
          )}
        </div>
      </SlideTransition>
    </>
  );
}

export default ForgotSection;

