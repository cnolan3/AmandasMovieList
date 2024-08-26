import { useSearchMovies } from "../../../hooks/useMovieData";
import Spinner from "../../UI/Spinner/Spinner";
import MovieListItem from "../MovieListItem/MovieListItem";
import MovieList from "./MovieList";
import styles from "./SearchList.module.scss";

function SearchList({ onSelectMovie, searchQuery }) {
  const { movies, error, status } = useSearchMovies(searchQuery);
  const movieList = movies && movies.Search ? movies.Search : null;

  if (status === "pending")
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size={20} />
      </div>
    );

  return (
    <MovieList
      movieList={movieList}
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
