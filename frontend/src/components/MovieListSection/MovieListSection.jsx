import { useEffect, useState } from "react";

import { useSearch } from "../../contexts/searchContext";
import MovieInfo from "../MovieInfo/MovieInfo";
import SeenList from "../MovieList/SeenList";
import WatchList from "../MovieList/WatchList";
import styles from "./MovieListSection.module.scss";

function MovieList() {
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
      <div className={styles.movieList}>
        <div className={styles.tabRow}>
          <div
            className={
              tabState === "watchlist"
                ? `${styles.tab} ${styles.active}`
                : styles.tab
            }
            onClick={() => setTabState("watchlist")}
          >
            <h3>Watchlist</h3>
          </div>
          <div
            className={
              tabState === "seenlist"
                ? `${styles.tab} ${styles.active}`
                : styles.tab
            }
            onClick={() => setTabState("seenlist")}
          >
            <h3>Seen</h3>
          </div>
        </div>
        {tabState === "watchlist" ? (
          <WatchList
            onSelectMovie={(movie) => handleSelectMovie(movie)}
            searchQuery={query}
          />
        ) : (
          <SeenList
            onSelectMovie={(movie) => handleSelectMovie(movie)}
            searchQuery={query}
          />
        )}
      </div>

      <div
        className={`${styles.infoCard}${showCard ? ` ${styles.show}` : hasShown ? ` ${styles.hide}` : ""}`}
      >
        <MovieInfo
          movie={selectedMovie}
          onClose={handleUnselectMovie}
        ></MovieInfo>
      </div>
    </>
  );
}

export default MovieList;

