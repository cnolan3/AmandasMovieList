import BounceLoader from "react-spinners/BounceLoader";
import PulseLoader from "react-spinners/PulseLoader";

import variables from "../../sass/colors.module.scss";

function Spinner() {
  return (
    <PulseLoader color={variables.colorPrimary} loading={true} size={20} />
  );
}

export default Spinner;

