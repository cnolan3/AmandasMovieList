import { useScreenSize } from "../../../hooks/useScreenSize";
import filterMovieList from "../../../utils/filterMovieList";
import ListStats from "../../UI/ListStats/ListStats";
import Spinner from "../../UI/Spinner/Spinner";
import MovieList from "./MovieList";
import styles from "./WatchList.module.scss";

function WatchList({ movieList, movieListStatus, searchQuery, render }) {
  const { height } = useScreenSize();

  const filteredList = filterMovieList(movieList, searchQuery);

  if (movieListStatus === "pending")
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size={20} />
      </div>
    );

  return (
    <>
      {height > 450 && (
        <ListStats className={styles.listStats} list={filteredList} />
      )}
      <MovieList
        movieList={filteredList}
        emptyListMsg="No Movies In List"
        noResultsMsg="Search Not Found"
        isSearchActive={searchQuery}
        render={render}
      />
    </>
  );
}

export default WatchList;
