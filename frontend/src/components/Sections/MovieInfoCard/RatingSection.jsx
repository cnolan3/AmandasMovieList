import { useState } from "react";

import colors from "../../../sass/colors.module.scss";
import Button from "../../UI/Button/Button";
import StarRating from "../../UI/StarRating/StarRating";
import styles from "./RatingSection.module.scss";

function RatingSection({
  disableNoRateBtn = false,
  onRate,
  rateBtnLabel,
  noRateBtnLabel,
}) {
  const [ratingState, setRatingState] = useState(0);
  return (
    <div className={styles.rateSection}>
      <StarRating
        color={colors.colorBackground}
        size={25}
        defaultRating={1}
        onSetRating={(r) => setRatingState(r)}
      />
      <div className={styles.btnSection}>
        <Button className={styles.rateBtn} onClick={() => onRate(ratingState)}>
          {rateBtnLabel}
        </Button>
        <Button
          className={`${styles.noRateBtn} ${disableNoRateBtn ? styles.disabled : ""}`}
          onClick={() => onRate(0)}
          disabled={disableNoRateBtn}
        >
          {noRateBtnLabel}
        </Button>
      </div>
    </div>
  );
}

export default RatingSection;

