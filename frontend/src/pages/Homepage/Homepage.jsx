import HeaderSection from "../../components/HeaderSection/HeaderSection";
import MainSection from "../../components/MainSection/MainSection";
import MovieList from "../../components/MovieList/MovieList";

function Homepage() {
  return (
    <div>
      <HeaderSection />
      <MainSection>
        <MovieList />
      </MainSection>
    </div>
  );
}

export default Homepage;
