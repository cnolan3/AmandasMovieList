import { HiChevronDoubleDown } from "react-icons/hi";

import colors from "../../../sass/colors.module.scss";
import styles from "./InfoCard.module.scss";

function InfoCard({ title, onClose, children }) {
  return (
    <div className={styles.infoCardContainer}>
      <div className={styles.titleSection}>
        <h2>{title}</h2>

        <HiChevronDoubleDown
          onClick={onClose}
          className={styles.closeIcon}
          size={70}
          color={colors.colorBackground}
        />
      </div>
      {children}
    </div>
  );
}

export default InfoCard;

