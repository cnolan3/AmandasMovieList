import BounceLoader from "react-spinners/BounceLoader";
import PulseLoader from "react-spinners/PulseLoader";

import variables from "../../sass/colors.module.scss";

function Spinner({ size = 10 }) {
  return (
    <PulseLoader color={variables.colorPrimary} loading={true} size={size} />
  );
}

export default Spinner;

