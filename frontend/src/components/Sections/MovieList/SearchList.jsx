import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

import { useMovieList } from "../../../contexts/MovieListContext";
import { useSearchMovies } from "../../../hooks/useMovieData";
import colors from "../../../sass/colors.module.scss";
import filterMovieList from "../../../utils/filterMovieList";
import ListStats from "../../UI/ListStats/ListStats";
import Spinner from "../../UI/Spinner/Spinner";
import MovieListItem from "../MovieListItem/MovieListItem";
import MovieList from "./MovieList";
import styles from "./SeenList.module.scss";

function SearchList({ onSelectMovie, searchQuery }) {
  const { movies, error, status } = useSearchMovies(searchQuery);
  // const { numResults, Search: movieList, totalResults } = movies;

  if (status === "pending")
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size={20} />
      </div>
    );

  return (
    <MovieList moviesStatus={status}>
      {movies && movies.Search && movies.Search.length > 0 ? (
        movies.Search.map((movie, i) => (
          <MovieListItem
            onClick={() => onSelectMovie(movie.imdbID)}
            movie={movie}
            position={i + 1}
            key={movie.imdbID}
          >
            {/* <div className={styles.stat}>
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
            </div> */}
          </MovieListItem>
        ))
      ) : searchQuery ? (
        <h2 className={styles.listEmptyMessage}>Search Not Found</h2>
      ) : (
        <h2 className={styles.listEmptyMessage}>
          Use search bar to find movies by title
        </h2>
      )}
    </MovieList>
  );
}

export default SearchList;
