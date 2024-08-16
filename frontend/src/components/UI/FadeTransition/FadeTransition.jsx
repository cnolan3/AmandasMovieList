import { useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import ComponentTransition from "../ComponentTransition/ComponentTransition";
import "./FadeTransition.css";

function FadeTransition({
  stageState,
  firstComponent,
  secondComponent,
  children,
}) {
  return (
    <ComponentTransition
      stageState={stageState}
      transClassName={"fade"}
      firstComponent={firstComponent}
      secondComponent={secondComponent}
    >
      {children}
    </ComponentTransition>
  );
}

export default FadeTransition;
