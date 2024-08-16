import styles from "./MovieList.module.scss";

function MovieList({
  movieList,
  emptyListMsg,
  noResultsMsg,
  isSearchActive,
  render,
}) {
  return (
    <div className={styles.listContainer}>
      <ul className={styles.list}>
        {movieList && movieList.length > 0 ? (
          movieList.map(render)
        ) : isSearchActive ? (
          <h2 className={styles.listEmptyMessage}>{noResultsMsg}</h2>
        ) : (
          <h2 className={styles.listEmptyMessage}>{emptyListMsg}</h2>
        )}
      </ul>
    </div>
  );
}

export default MovieList;
