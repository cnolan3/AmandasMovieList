import { HiChevronDoubleDown } from "react-icons/hi";

import variables from "../../sass/colors.module.scss";
import styles from "./MovieInfo.module.scss";

function MovieInfo({ movie, onClose }) {
  return (
    <div className={styles.movieInfoCard}>
      {/* <HiChevronDoubleDown
        onClick={onClose}
        className={styles.closeButton}
        size={40}
        color={variables.colorBackground}
      /> */}
      {/* <div className={styles.sliderIndicatorContainer} onClick={onClose}>
        <div className={styles.sliderIndicator} />
      </div> */}
      {movie && (
        <div className={styles.cardContainer}>
          <div className={styles.titleSection}>
            <h2>{movie.title}</h2>
          </div>

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

          <div className={styles.plotSection}>
            <p>{movie.plot}</p>
          </div>

          <div className={styles.lowerSection}>
            <HiChevronDoubleDown
              onClick={onClose}
              size={80}
              color={variables.colorBackground}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieInfo;

