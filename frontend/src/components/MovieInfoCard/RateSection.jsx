import { useState } from "react";

import colors from "../../sass/colors.module.scss";
import Button from "../Button/Button";
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
      <Button className={styles.rateBtn} onClick={() => onRate(rating)}>
        Rate Movie and Move
      </Button>
      <Button className={styles.moveBtn} onClick={() => onRate(null)}>
        Move without Rating
      </Button>
    </div>
  );
}

export default RateSection;

