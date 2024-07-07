import styles from "./ListStats.module.scss";

function ListStats({ list }) {
  const numItems = list.length;
  const movieTag = numItems > 1 ? "Movies" : "Movie";

  return (
    <div className={styles.listStats}>
      <div className={styles.numItems}>
        <p>{numItems}</p>
      </div>
      <p className={styles.numItemsTag}>{movieTag}</p>
    </div>
  );
}

export default ListStats;
