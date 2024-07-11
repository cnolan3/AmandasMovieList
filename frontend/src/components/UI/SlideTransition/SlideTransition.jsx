import { useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import "./SlideTrans.css";

function SlideTransition({
  stageState,
  firstComponent,
  secondComponent,
  children,
}) {
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const nodeRef = stageState ? firstRef : secondRef;

  const childComponent = stageState ? { firstComponent } : { secondComponent };

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={stageState}
        nodeRef={nodeRef}
        addEndListener={(done) => {
          nodeRef.current.addEventListener("transitionend", done, false);
        }}
        classNames={stageState ? "slide-left" : "slide-right"}
      >
        <div ref={nodeRef} className="transition-ref">
          {children ? children : childComponent}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default SlideTransition;

