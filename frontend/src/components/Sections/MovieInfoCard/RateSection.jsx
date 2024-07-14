import { useState } from "react";

import colors from "../../../sass/colors.module.scss";
import Button from "../../UI/Button/Button";
import StarRating from "../../UI/StarRating/StarRating";
import styles from "./RateSection.module.scss";

function RateSection({ onRate }) {
  const [rating, setRating] = useState(1);

  return (
    <div className={styles.rateSection}>
      <StarRating
        color={colors.colorBackground}
        size={25}
        defaultRating={1}
        onSetRating={(r) => setRating(r)}
      />
      <Button
        className={`${styles.rateBtn} ${styles.btn}`}
        onClick={() => onRate(rating)}
      >
        Rate Movie and Move
      </Button>
      <Button
        className={`${styles.moveBtn} ${styles.btn}`}
        onClick={() => onRate(null)}
      >
        Move without Rating
      </Button>
    </div>
  );
}

export default RateSection;

