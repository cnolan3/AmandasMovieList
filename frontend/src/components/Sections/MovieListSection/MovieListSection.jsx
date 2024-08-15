import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { useBlur } from "../../../contexts/BlurContext";
import { useSearch } from "../../../contexts/searchContext";
import { useMovieList } from "../../../contexts/MovieListContext";
import MovieListCard from "../MovieInfoCard/MovieListCard";
import WatchList from "../MovieList/WatchList";
import styles from "./MovieListSection.module.scss";
import "./transition.css";

function MovieListSection() {
  const { watchList, watchListStatus, seenList, seenListStatus } = useMovieList();
  const [tabState, setTabState] = useState("watchlist");
  const { setPlaceholder, setQuery, query } = useSearch();
  const [selectedMovie, setSelectedMovie] = useState();
  const [showCard, setShowCard] = useState(false);
  const { setBlur } = useBlur();
  const nodeRef = useRef(null);

  useEffect(() => {
    setPlaceholder("Search the movie list");
    setQuery("");
  }, []);

  function handleSelectMovie(movie) {
    setShowCard(true);
    setBlur(true);
    setSelectedMovie(movie);
  }

  function handleUnselectMovie() {
    setBlur(false);
    setShowCard(false);
  }

  return (
    <div className={styles.movieListContainer}>
      <div className={styles.movieList}>
        {/* TABS */}
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

        {/* WATCHLIST/SEENLIST */}
        {tabState === "watchlist" ? (
          <WatchList
            movieList={watchList}
            movieListStatus={watchListStatus}
            searchQuery={query}
            render={(movie, i) => (
              <MovieListItem
                movie={movie}
                position={i + 1}
                key={movie.imdbID}
                onClick={() => handleSelectMovie(movie)}
              >
                <IconContext.Provider value={{ color: colors.colorPrimary }}>
                  <div className={styles.stat}>
                    <FaClock />
                    <span>{movie.Runtime}</span>
                  </div>
                  <div className={styles.stat}>
                    <SiRottentomatoes />
                    <span>
                      {movie.rottenTomatoRating === -1
                        ? "N/A"
                        : `${movie.rottenTomatoRating}%`}
                    </span>
                  </div>
                </IconContext.Provider>
              </MovieListItem>
            )}
          />
        ) : (
          <WatchList
            movieList={seenList}
            movieListStatus={seenListStatus}
            searchQuery={query}
            render={(movie, i) => (
              <MovieListItem
                onClick={() => onSelectMovie(movie)}
                movie={movie}
                position={i + 1}
                key={movie.imdbID}
              >
                <div className={styles.stat}>
                  {movie.amandaRating && movie.amandaRating > 0 ? (
                    <IconContext.Provider value={{ color: colors.colorPrimary }}>
                      {Array.from(
                        { length: movie.amandaRating },
                        (item, index) => (
                          <FaStar key={index} />
                        ),
                      )}
                      {Array.from(
                        { length: 5 - movie.amandaRating },
                        (item, index) => (
                          <FaRegStar key={index} />
                        ),
                      )}
                    </IconContext.Provider>
                  ) : (
                    <p>No rating</p>
                  )}
                </div>
              </MovieListItem>
            )}
          />
        )}

      </div>

      {/* INFOCARD */}
      <CSSTransition
        nodeRef={nodeRef}
        in={showCard}
        timeout={250}
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
    </div>
  );
}

export default MovieListSection;

