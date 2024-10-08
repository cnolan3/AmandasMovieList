import { useSearchMovies } from "../../../hooks/useMovieData";
import Spinner from "../../UI/Spinner/Spinner";
import MovieListItem from "../MovieListItem/MovieListItem";
import MovieList from "./MovieList";
import styles from "./SearchList.module.scss";

function SearchList({ onSelectMovie, searchQuery }) {
  const { movies, status } = useSearchMovies(searchQuery);

  if (status === "pending")
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size={20} />
      </div>
    );

  return (
    <MovieList
      movieList={movies}
      emptyListMsg="Use search bar to find movies by title"
      noResultsMsg="Search Not Found"
      isSearchActive={searchQuery}
      render={(movie, i) => (
        <MovieListItem
          onClick={() => onSelectMovie(movie.imdbID)}
          movie={movie}
          position={i + 1}
          key={movie.imdbID}
        />
      )}
    />
  );
}

export default SearchList;
