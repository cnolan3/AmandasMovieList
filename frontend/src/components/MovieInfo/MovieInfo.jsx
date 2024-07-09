import { HiChevronDoubleDown } from "react-icons/hi";

import variables from "../../sass/colors.module.scss";
import styles from "./MovieInfo.module.scss";

function MovieInfo({ movie, onClose, children }) {
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
        <>
          <div className={styles.titleSection}>
            <h2>{movie.title}</h2>
          </div>

          {children && <div className={styles.childSection}>{children}</div>}

          <div className={styles.scroll}>
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

              <div className={styles.plotSection}>
                <p>{movie.plot}</p>
              </div>

              <div className={styles.extraInfoSection}>
                {movie.cast && (
                  <p>
                    <strong>Starring: </strong>
                    {movie.cast}
                  </p>
                )}
                {movie.director && (
                  <p>
                    <strong>Directed by: </strong>
                    {movie.director}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.lowerSection}>
            <HiChevronDoubleDown
              onClick={onClose}
              className={styles.closeIcon}
              size={80}
              color={variables.colorBackground}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default MovieInfo;

