import styles from "./PlotSection.module.scss";

function PlotSection({ movie }) {
  return (
    <>
      <p>{movie.plot}</p>

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
    </>
  );
}

export default PlotSection;

