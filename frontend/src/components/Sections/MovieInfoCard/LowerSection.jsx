import { FaArrowRight, FaTrash } from "react-icons/fa";

import colors from "../../../sass/colors.module.scss";
import Button from "../../UI/Button/Button";
import styles from "./LowerSection.module.scss";

function LowerSection({
  stage,
  setStage,
  onDelete,
  buttonLabelFirst,
  buttonLabelSecond,
}) {
  return (
    <>
      <Button
        className={`${styles.deleteBtn} ${stage ? "" : styles.disabled}`}
        onClick={onDelete}
        disabled={!stage}
      >
        <FaTrash
          color={stage ? colors.colorBackground : colors.colorBackgroundFaded}
        />
        Remove
      </Button>
      <Button
        className={styles.stageBtn}
        onClick={() => setStage((stage) => !stage)}
      >
        {stage ? (
          <>
            {buttonLabelFirst}
            <FaArrowRight color={colors.colorText} />
          </>
        ) : (
          buttonLabelSecond
        )}
      </Button>
    </>
  );
}

export default LowerSection;
