import { HiChevronDoubleDown } from "react-icons/hi";

import { useScreenSize } from "../../../hooks/useScreenSize";
import colors from "../../../sass/colors.module.scss";
import styles from "./InfoCard.module.scss";

function InfoCard({ title, onClose, children }) {
  const { height } = useScreenSize();

  let closeBtnSize = 60;
  if (height > 600) closeBtnSize = 70;

  return (
    <div className={styles.infoCardContainer}>
      <div className={styles.titleSection}>
        <h2>{title}</h2>

        <HiChevronDoubleDown
          onClick={onClose}
          className={styles.closeIcon}
          size={closeBtnSize}
          color={colors.colorBackground}
        />
      </div>
      {children}
    </div>
  );
}

export default InfoCard;

