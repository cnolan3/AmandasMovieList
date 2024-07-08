import { useState } from "react";

import { useSearch } from "../../contexts/searchContext";
import { useSeenList } from "../../hooks/useMovieList";
import ListStats from "../ListStats/ListStats";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieListItem from "../MovieListItem/MovieListItem";
import Spinner from "../Spinner/Spinner";
import styles from "./SeenList.module.scss";

function SeenList() {
  const { query } = useSearch();
  const { seenList, error, status } = useSeenList();
  const [selectedMovie, setSelectedMovie] = useState();
  const [showCard, setShowCard] = useState(false);
  const [hasShown, setHasShown] = useState(false); // false if the card has never been opened before, true after first time opening

  let filteredSeenList = seenList;
  if (query && seenList)
    filteredSeenList = seenList.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()),
    );

  function handleSelectMovie(movie) {
    setSelectedMovie(movie);
    setHasShown(true);
    setShowCard(true);
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
          <ListStats list={seenList} />

          <div className={styles.listContainer}>
            <ul className={styles.list}>
              {filteredSeenList.map((movie, i) => (
                <MovieListItem
                  onClick={() => handleSelectMovie(movie)}
                  movie={movie}
                  position={i + 1}
                  key={movie.imdbID}
                >
                  <div className={styles.stat}>
                    {Array.from(
                      { length: movie.amandaRating },
                      (item, index) => (
                        <FullStar key={index} />
                      ),
                    )}
                    {Array.from(
                      { length: 5 - movie.amandaRating },
                      (item, index) => (
                        <EmptyStar key={index} />
                      ),
                    )}
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

function EmptyStar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );
}

function FullStar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default SeenList;
