import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { useSearch } from "../../../contexts/searchContext";
import MovieListCard from "../MovieInfoCard/MovieListCard";
import SeenListCard from "../MovieInfoCard/SeenListCard";
import WatchListCard from "../MovieInfoCard/WatchListCard";
import SeenList from "../MovieList/SeenList";
import WatchList from "../MovieList/WatchList";
import styles from "./MovieListSection.module.scss";
import "./transition.css";

function MovieListSection() {
  const [tabState, setTabState] = useState("watchlist");
  const { setPlaceholder, setQuery, query } = useSearch();
  const [selectedMovie, setSelectedMovie] = useState();
  const [showCard, setShowCard] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setPlaceholder("Search the movie list");
    setQuery("");
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
    console.log("close");
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

      <CSSTransition
        nodeRef={nodeRef}
        in={showCard}
        timeout={300}
        classNames="slide-up"
        unmountOnExit
      >
        <div className={styles.infoCard} ref={nodeRef}>
          {tabState === "watchlist" ? (
            <MovieListCard
              movie={selectedMovie}
              rateBtnLabel="Rate Movie and Move"
              noRateBtnLabel="Move Without Rating"
              stageBtnLabelFirst="Move to Seen"
              stageBtnLabelSecond="Cancel Move"
              onClose={handleUnselectMovie}
            />
          ) : (
            <MovieListCard
              movie={selectedMovie}
              rateBtnLabel="Rate Movie"
              noRateBtnLabel="Remove Rating"
              stageBtnLabelFirst="Rate Movie"
              stageBtnLabelSecond="Cancel"
              enableNoRateBtnDisable={true}
              onClose={handleUnselectMovie}
            />
          )}
        </div>
      </CSSTransition>
    </>
  );
}

export default MovieListSection;

