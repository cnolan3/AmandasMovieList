import { Outlet } from "react-router-dom";

import HeaderSection from "../../components/Sections/HeaderSection/HeaderSection";
import MainSection from "../../components/Sections/MainSection/MainSection";
import NavBar from "../../components/Sections/NavBar/NavBar";

function Homepage() {
  return (
    <div>
      <HeaderSection />
      <MainSection>
        <Outlet />
      </MainSection>
      <NavBar />
    </div>
  );
}

export default Homepage;
