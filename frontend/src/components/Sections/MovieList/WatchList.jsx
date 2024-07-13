import { FaClock } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";
import { SiRottentomatoes } from "react-icons/si";

import { useMovieList } from "../../../contexts/MovieListContext";
import colors from "../../../sass/colors.module.scss";
import filterMovieList from "../../../utils/filterMovieList";
import ListStats from "../../UI/ListStats/ListStats";
import Spinner from "../../UI/Spinner/Spinner";
import MovieListItem from "../MovieListItem/MovieListItem";
import MovieList from "./MovieList";
import styles from "./WatchList.module.scss";

function WatchList({ onSelectMovie, searchQuery }) {
  const { watchList, watchListStatus } = useMovieList();

  const filteredList = filterMovieList(watchList, searchQuery);

  if (watchListStatus === "pending")
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size={20} />
      </div>
    );

  return (
    <>
      <ListStats list={filteredList} />
      <MovieList movieListStatus={watchListStatus}>
        {filteredList && filteredList.length > 0 ? (
          filteredList.map((movie, i) => (
            <MovieListItem
              movie={movie}
              position={i + 1}
              key={movie.imdbID}
              onClick={() => onSelectMovie(movie)}
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
          ))
        ) : searchQuery ? (
          <h2 className={styles.listEmptyMessage}>Search Not Found</h2>
        ) : (
          <h2 className={styles.listEmptyMessage}>No Movies In List</h2>
        )}
      </MovieList>
    </>
  );
}

export default WatchList;
