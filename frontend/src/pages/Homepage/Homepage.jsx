import HeaderSection from "../../components/HeaderSection/HeaderSection";
import MainSection from "../../components/MainSection/MainSection";
import MovieListSection from "../../components/MovieListSection/MovieListSection";

function Homepage() {
  return (
    <div>
      <HeaderSection />
      <MainSection>
        <MovieListSection />
      </MainSection>
    </div>
  );
}

export default Homepage;
