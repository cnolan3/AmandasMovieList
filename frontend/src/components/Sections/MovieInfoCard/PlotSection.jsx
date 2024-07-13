import { useUser } from "../../../contexts/userContext";
import styles from "./PlotSection.module.scss";

function PlotSection({ movie }) {
  const { myInfo, loggedIn } = useUser();

  const isAmanda = loggedIn && myInfo.role === "amanda";

  return (
    <div className={styles.plotSectionContainer}>
      <p>{movie.Plot}</p>

      <div className={styles.extraInfoSection}>
        {movie.Actors && (
          <p>
            <strong>Starring: </strong>
            {movie.Actors}
          </p>
        )}
        {movie.Director && (
          <p>
            <strong>Directed by: </strong>
            {movie.Director}
          </p>
        )}

        {isAmanda && movie.recommendedByName && (
          <div className={styles.recommendedSection}>
            <p>
              <strong>Recommended by: </strong>
              {movie.recommendedByName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlotSection;

