import styles from "./MovieInfo.module.scss";

function MovieInfo({ movie, children }) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.posterSection}>
        <img className={styles.poster} src={movie.poster} />
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoRow}>
          <h4>Released</h4>
          <p>{movie.year}</p>
        </div>
        <div className={styles.infoRow}>
          <h4>Genre</h4>
          <p>{movie.genre}</p>
        </div>
        <div className={styles.infoRow}>
          <h4>Runtime</h4>
          <p>{movie.runtime}</p>
        </div>
        <div className={styles.infoRow}>
          <h4>Rotten Tomatoes Rating</h4>
          <p>
            {movie.rottenTomatoRating === -1
              ? "N/A"
              : `${movie.rottenTomatoRating}%`}
          </p>
        </div>
      </div>

      <div className={styles.plotSection}>{children}</div>
    </div>
  );
}

export default MovieInfo;

