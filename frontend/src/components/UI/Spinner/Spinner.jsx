import BounceLoader from "react-spinners/BounceLoader";
import PulseLoader from "react-spinners/PulseLoader";

import colors from "../../../sass/colors.module.scss";

function Spinner({ color = colors.colorPrimary, size = 10 }) {
  return <PulseLoader color={color} loading={true} size={size} />;
}

export default Spinner;
