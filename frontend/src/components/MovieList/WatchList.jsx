import { FaClock } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";
import { SiRottentomatoes } from "react-icons/si";

import { useSearch } from "../../contexts/searchContext";
import { useWatchList } from "../../hooks/useMovieList";
import colors from "../../sass/colors.module.scss";
import MovieListItem from "../MovieListItem/MovieListItem";
import Spinner from "../Spinner/Spinner";
import MovieList from "./MovieList";
import styles from "./WatchList.module.scss";

function WatchList({ onSelectMovie }) {
  const { query } = useSearch();
  const { watchList, error, status } = useWatchList();

  let filteredWatchList = watchList;
  if (query && watchList)
    filteredWatchList = watchList.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()),
    );

  if (status === "pending") return <Spinner />;

  return (
    <MovieList movieList={filteredWatchList}>
      {filteredWatchList.map((movie, i) => (
        <MovieListItem
          movie={movie}
          position={i + 1}
          key={movie.imdbID}
          onClick={() => onSelectMovie(movie)}
        >
          <IconContext.Provider value={{ color: colors.colorPrimary }}>
            <div className={styles.stat}>
              <FaClock />
              <span>{movie.runtime}</span>
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
      ))}
    </MovieList>
  );
}

export default WatchList;