import { FaRegStar, FaStar } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

import { useSeenList } from "../../hooks/useMovieList";
import colors from "../../sass/colors.module.scss";
import MovieListItem from "../MovieListItem/MovieListItem";
import Spinner from "../Spinner/Spinner";
import MovieList from "./MovieList";
import styles from "./SeenList.module.scss";

function SeenList({ onSelectMovie, searchQuery }) {
  const { seenList, error, status } = useSeenList();

  let filteredSeenList = seenList;
  if (searchQuery && seenList)
    filteredSeenList = seenList.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  if (status === "pending")
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size={20} />
      </div>
    );

  return (
    <MovieList movieList={filteredSeenList}>
      {filteredSeenList.map((movie, i) => (
        <MovieListItem
          onClick={() => onSelectMovie(movie)}
          movie={movie}
          position={i + 1}
          key={movie.imdbID}
        >
          <div className={styles.stat}>
            <IconContext.Provider value={{ color: colors.colorPrimary }}>
              {Array.from({ length: movie.amandaRating }, (item, index) => (
                <FaStar key={index} />
              ))}
              {Array.from({ length: 5 - movie.amandaRating }, (item, index) => (
                <FaRegStar key={index} />
              ))}
            </IconContext.Provider>
          </div>
        </MovieListItem>
      ))}
    </MovieList>
  );
}

export default SeenList;
