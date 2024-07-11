import { useOutletContext } from "react-router-dom";

function ForgotSubPage() {
  const [onSubmit] = useOutletContext();
  return <h2>Reset Sub-page</h2>;
}

export default ForgotSubPage;

