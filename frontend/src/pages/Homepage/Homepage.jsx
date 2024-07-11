import { Outlet } from "react-router-dom";

import HeaderSection from "../../components/Sections/HeaderSection/HeaderSection";
import MainSection from "../../components/Sections/MainSection/MainSection";

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
