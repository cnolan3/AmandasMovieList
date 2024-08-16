import { useScreenSize } from "../../../hooks/useScreenSize";
import styles from "./MovieInfo.module.scss";

function MovieInfo({ movie, children }) {
  const { height } = useScreenSize();

  return (
    <>
      <div className={styles.cardContainer}>
        {height > 600 && (
          <div className={styles.posterRow}>
            <div className={styles.posterSection}>
              <img className={styles.poster} src={movie.Poster} />
            </div>
            <div className={styles.infoSection}>
              <div className={styles.infoRow}>
                <h4>Released</h4>
                <p>{movie.Year}</p>
              </div>
              <div className={styles.infoRow}>
                <h4>Genre</h4>
                <p>{movie.Genre}</p>
              </div>
              <div className={styles.infoRow}>
                <h4>Runtime</h4>
                <p>{movie.Runtime}</p>
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
          </div>
        )}

        <div className={styles.plotSection}>{children}</div>
      </div>
    </>
  );
}

export default MovieInfo;
