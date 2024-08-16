import { useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import ComponentTransition from "../ComponentTransition/ComponentTransition";
import "./SlideTransition.css";

function SlideTransition({
  stageState,
  firstComponent,
  secondComponent,
  children,
}) {
  const slideClass = stageState ? "slide-left" : "slide-right";

  return (
    <ComponentTransition
      stageState={stageState}
      transClassName={slideClass}
      firstComponent={firstComponent}
      secondComponent={secondComponent}
    >
      {children}
    </ComponentTransition>
  );
}

export default SlideTransition;
