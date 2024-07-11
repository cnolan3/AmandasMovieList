import { useState } from "react";

import colors from "../../sass/colors.module.scss";
import StarRating from "../StarRating/StarRating";
import styles from "./RateSection.module.scss";

function RateSection({ onRate }) {
  const [rating, setRating] = useState(1);

  return (
    <div className={styles.rateSection}>
      <StarRating
        color={colors.colorBackground}
        size={30}
        defaultRating={1}
        onSetRating={(r) => setRating(r)}
      />
      <button
        className={`${styles.btn} ${styles.rateBtn}`}
        onClick={() => onRate(rating)}
      >
        Rate Movie and Move
      </button>
      <button
        className={`${styles.btn} ${styles.moveBtn}`}
        onClick={() => onRate(null)}
      >
        Move without Rating
      </button>
    </div>
  );
}

export default RateSection;

