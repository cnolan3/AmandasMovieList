import { useEffect, useState } from "react";

import { useSearch } from "../../../contexts/searchContext";
import SeenListCard from "../MovieInfoCard/SeenListCard";
import WatchListCard from "../MovieInfoCard/WatchListCard";
import SeenList from "../MovieList/SeenList";
import WatchList from "../MovieList/WatchList";
import styles from "./MovieListSection.module.scss";

function AddMovieSection() {
  const [tabState, setTabState] = useState("watchlist");
  const { setPlaceholder, query } = useSearch();
  const [selectedMovie, setSelectedMovie] = useState();
  const [showCard, setShowCard] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    setPlaceholder("Search the movie list");
  }, []);

  // let selectedRecommendedBy = "";
  // if (selectedMovie && selectedMovie.recommendedById)
  //   selectedRecommendedBy = selectedMovie.recommendedById.username;
  // if (selectedMovie && selectedMovie.recommendedByName)
  //   selectedRecommendedBy = selectedMovie.recommendedByName;

  function handleSelectMovie(movie) {
    setHasShown(true);
    setShowCard(true);
    setSelectedMovie(movie);
  }

  function handleUnselectMovie() {
    setShowCard(false);
  }

  return (
    <>
      <WatchList
        onSelectMovie={(movie) => handleSelectMovie(movie)}
        searchQuery={query}
      />
      <div
        className={`${styles.infoCard}${showCard ? ` ${styles.show}` : hasShown ? ` ${styles.hide}` : ""}`}
      >
        <WatchListCard
          movie={selectedMovie}
          onClose={handleUnselectMovie}
        ></WatchListCard>
      </div>
    </>
  );
}

export default AddMovieSection;

