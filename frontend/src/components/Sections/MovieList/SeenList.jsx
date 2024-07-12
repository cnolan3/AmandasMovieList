import { FaRegStar, FaStar } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

import { useMovieList } from "../../../contexts/MovieListContext";
import colors from "../../../sass/colors.module.scss";
import filterMovieList from "../../../utils/filterMovieList";
import Spinner from "../../UI/Spinner/Spinner";
import MovieListItem from "../MovieListItem/MovieListItem";
import MovieList from "./MovieList";
import styles from "./SeenList.module.scss";

function SeenList({ onSelectMovie, searchQuery }) {
  const { seenList, seenListStatus } = useMovieList();

  const filteredList = filterMovieList(seenList, searchQuery);

  if (seenListStatus === "pending")
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size={20} />
      </div>
    );

  return (
    <MovieList movieList={filteredList} movieListStatus={seenListStatus}>
      {filteredList && filteredList.length > 0 ? (
        filteredList.map((movie, i) => (
          <MovieListItem
            onClick={() => onSelectMovie(movie)}
            movie={movie}
            position={i + 1}
            key={movie.imdbID}
          >
            <div className={styles.stat}>
              {movie.amandaRating && movie.amandaRating > 0 ? (
                <IconContext.Provider value={{ color: colors.colorPrimary }}>
                  {Array.from({ length: movie.amandaRating }, (item, index) => (
                    <FaStar key={index} />
                  ))}
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
        ))
      ) : searchQuery ? (
        <h2 className={styles.listEmptyMessage}>Search Not Found</h2>
      ) : (
        <h2 className={styles.listEmptyMessage}>No Movies In List</h2>
      )}
    </MovieList>
  );
}

export default SeenList;
