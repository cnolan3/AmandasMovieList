import { FaArrowRight, FaTrash } from "react-icons/fa";

import { useUser } from "../../contexts/userContext";
import { useDeleteMovie } from "../../hooks/useMovieList";
import colors from "../../sass/colors.module.scss";
import InfoCard from "./InfoCard";
import MovieInfo from "./MovieInfo";
import PlotSection from "./PlotSection";
import styles from "./SeenListCard.module.scss";

function SeenListCard({ movie, onClose }) {
  const { myInfo, loggedIn } = useUser();
  const { status: deleteMovieStatus, deleteMovie } = useDeleteMovie();

  const isAmanda = loggedIn ? myInfo.role === "amanda" : false;

  function handleDeleteMovie(movieId) {
    deleteMovie(movieId, { onSuccess: () => onClose() });
  }

  if (!movie) return;

  return (
    <InfoCard title={movie.title} onClose={onClose}>
      <MovieInfo movie={movie}>
        <PlotSection movie={movie} />
      </MovieInfo>
      {isAmanda && (
        <div className={styles.lowerSection}>
          <button
            className={`${styles.btn} ${styles.deleteBtn}`}
            onClick={() => handleDeleteMovie(movie.imdbID)}
          >
            <FaTrash color={colors.colorBackground} />
            Remove
          </button>
        </div>
      )}
    </InfoCard>
  );
}

export default SeenListCard;

