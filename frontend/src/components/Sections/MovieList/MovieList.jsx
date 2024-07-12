import ListStats from "../../UI/ListStats/ListStats";
import styles from "./MovieList.module.scss";

function MovieList({ children }) {
  return (
    <div className={styles.listContainer}>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}

export default MovieList;

