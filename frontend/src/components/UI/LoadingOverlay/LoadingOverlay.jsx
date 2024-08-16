import { useEffect, useRef, useState } from "react";

import { useLoadingOverlay } from "../../../contexts/loadingOverlayContext";
import Spinner from "../Spinner/Spinner";
import styles from "./LoadingOverlay.module.scss";

function LoadingOverlay() {
  const { isLoading, spinnerColor } = useLoadingOverlay();
  const timerId = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // start a timer to show the loading spinner 500ms after hitting 'login'
    if (isLoading) {
      timerId.current = setTimeout(() => {
        setShow(true);
      }, 500);
    } else {
      clearTimeout(timerId.current);
      if (show) setShow(false);
    }
  }, [isLoading, show]);

  return (
    <>
      {isLoading && show && (
        <div className={styles.overlay}>
          <Spinner color={spinnerColor} size={20} />
        </div>
      )}
    </>
  );
}

export default LoadingOverlay;
