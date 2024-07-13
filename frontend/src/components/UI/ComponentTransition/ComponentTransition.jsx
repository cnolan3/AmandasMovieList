import { useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import styles from "./ComponentTransition.module.scss";

function ComponentTransition({
  stageState,
  transClassName,
  firstComponent,
  secondComponent,
  children,
}) {
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const nodeRef = stageState ? firstRef : secondRef;

  const childComponent = stageState ? firstComponent : secondComponent;

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={stageState}
        nodeRef={nodeRef}
        addEndListener={(done) => {
          nodeRef.current.addEventListener("transitionend", done, false);
        }}
        classNames={transClassName}
      >
        <div ref={nodeRef} className={styles.transitionRef}>
          {children ? children : childComponent}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default ComponentTransition;

