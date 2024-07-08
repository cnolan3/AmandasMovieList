import { useEffect, useState } from "react";

import { useSearch } from "../../contexts/searchContext";
import { useWatchList } from "../../hooks/useMovieList";
import ListStats from "../ListStats/ListStats";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieListItem from "../MovieListItem/MovieListItem";
import Spinner from "../Spinner/Spinner";
import styles from "./WatchList.module.scss";

function WatchList() {
  const { query } = useSearch();
  const { watchList, error, status } = useWatchList();
  const [selectedMovie, setSelectedMovie] = useState();
  const [showCard, setShowCard] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  let filteredWatchList = watchList;
  if (query && watchList)
    filteredWatchList = watchList.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()),
    );

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
      {status === "pending" ? (
        <Spinner />
      ) : (
        <>
          <ListStats list={watchList} />
          <div className={styles.listContainer}>
            <ul className={styles.list}>
              {filteredWatchList.map((movie, i) => (
                <MovieListItem
                  movie={movie}
                  position={i + 1}
                  key={movie.imdbID}
                  onClick={() => handleSelectMovie(movie)}
                >
                  <div className={styles.stat}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{movie.runtime}</span>
                  </div>
                  <div className={styles.stat}>
                    <svg
                      viewBox="0 0 1024 1176.463"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <path d="M329.572 412.228l.96 13.516c.56 7.438.96 29.15.96 48.226v34.67l23.273-1c12.134-.408 23.624-1.527 34.888-3.326l-1.577.208c27.752-5.84 41.908-19.115 43.468-40.708.263-1.722.413-3.708.413-5.73 0-11.44-4.807-21.757-12.51-29.042l-.02-.018c-12.716-12.356-30.43-16.636-69.3-16.716zm-120.605-91.493h99.092c13.583-1.432 29.347-2.248 45.3-2.248 34.243 0 67.607 3.762 99.702 10.894l-3.043-.567c41.017 11.09 74.09 38.813 92.117 75.298l.375.84c2 4.24 3.68 8.24 5.198 12.197l304.832.32 1.08 116.447-109.768-.96v301.873l-119.246-.64V533.394l-85.056.64c-9.973 18.838-24.317 34.182-41.736 45.06l-.492.287c-11.476 7.04-11.997 7.6-10.157 10.558 5.08 8 84.976 145.638 84.976 146.318l-135.56.76-80.497-135.002c-1.36-1.88-4.878-2.718-13.756-3.358l-11.877-.8 1.48 139.16L208.97 735.5zM266.71 32.138l-61.222 50.466 83.256 71.98c-14.778-4.866-31.786-7.67-49.45-7.67-67.765 0-125.886 41.29-150.574 100.087l-.4 1.076c31.734-9.126 68.185-14.374 105.862-14.374 9.803 0 19.523.355 29.148 1.054l-1.29-.075C108.564 308.774 34.615 435.164 34.615 578.826c0 118.06 49.942 224.458 129.852 299.217l.23.214c89.764 70.643 204.44 113.3 329.08 113.3 152.212 0 289.564-63.616 386.918-165.712l.202-.213c241.33-259.124 70.698-767.498-414.483-682.882 4.28-46.784 25.313-60.103 49.706-64.064-35.59-59.7-146.76-29.35-182.19 54.95-1.08 2.556-67.22-101.494-67.22-101.494z" />
                    </svg>
                    <span>
                      {movie.rottenTomatoRating === -1
                        ? "N/A"
                        : `${movie.rottenTomatoRating}%`}
                    </span>
                  </div>
                </MovieListItem>
              ))}
            </ul>
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
      )}
    </>
  );
}

export default WatchList;
