import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { useBlur } from "../../../contexts/BlurContext";
import styles from "./BlurOverlay.module.scss";
import "./transition.css";

function BlurOverlay() {
  const { blur } = useBlur();
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={blur}
      timeout={250}
      classNames="fade-in"
      unmountOnExit
    >
      <div className="transition-ref" ref={nodeRef}>
        <div className={styles.blur} />
      </div>
    </CSSTransition>
  );
}

export default BlurOverlay;

