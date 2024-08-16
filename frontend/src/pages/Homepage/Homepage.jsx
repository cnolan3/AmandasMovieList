import { Outlet } from "react-router-dom";

import HeaderSection from "../../components/Sections/HeaderSection/HeaderSection";
import MainSection from "../../components/Sections/MainSection/MainSection";
import NavBar from "../../components/Sections/NavBar/NavBar";
import BlurOverlay from "../../components/UI/BlurOverlay/BlurOverlay";
import styles from "./Homepage.module.scss";

function Homepage() {
  return (
    <>
      <div className={styles.homepage}>
        <HeaderSection />
        <MainSection>
          <Outlet />
          <div className={styles.footer}>
            <a target="_blank" href="https://icons8.com/icon/59878/search">
              Search
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </div>
          <NavBar />
        </MainSection>
      </div>
      <BlurOverlay />
    </>
  );
}

export default Homepage;
