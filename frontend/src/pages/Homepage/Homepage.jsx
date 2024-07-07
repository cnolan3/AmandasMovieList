import { Outlet } from "react-router-dom";

import HeaderSection from "../../components/HeaderSection/HeaderSection";
import MainSection from "../../components/MainSection/MainSection";

function Homepage() {
  return (
    <div>
      <HeaderSection />
      <MainSection>
        <Outlet />
      </MainSection>
    </div>
  );
}

export default Homepage;
