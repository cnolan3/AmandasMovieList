import { useEffect } from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa";

import { useLoadingOverlay } from "../../../contexts/loadingOverlayContext";
import { useUser } from "../../../contexts/userContext";
import { useDeleteMovie } from "../../../hooks/useMovieList";
import colors from "../../../sass/colors.module.scss";
import Button from "../../UI/Button/Button";
import InfoCard from "../../UI/InfoCard/InfoCard";
import MovieInfo from "./MovieInfo";
import PlotSection from "./PlotSection";
import styles from "./SeenListCard.module.scss";

function SeenListCard({ movie, onClose }) {
  const { setIsLoading } = useLoadingOverlay();
  const { myInfo, loggedIn } = useUser();
  const { status: deleteMovieStatus, deleteMovie } = useDeleteMovie();

  const isAmanda = loggedIn ? myInfo.role === "amanda" : false;

  useEffect(() => {
    setIsLoading(deleteMovieStatus === "pending");
  }, [setIsLoading, deleteMovieStatus]);

  function handleDeleteMovie(movieId) {
    deleteMovie(movieId, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  if (!movie) return;

  return (
    <InfoCard title={movie.Title} onClose={onClose}>
      <MovieInfo movie={movie}>
        <div className={styles.transitionRef}>
          <PlotSection movie={movie} />
        </div>
      </MovieInfo>
      {isAmanda && (
        <div className={styles.lowerSection}>
          <Button
            className={styles.deleteBtn}
            onClick={() => handleDeleteMovie(movie.imdbID)}
          >
            <FaTrash color={colors.colorBackground} />
            Remove
          </Button>
        </div>
      )}
    </InfoCard>
  );
}

export default SeenListCard;

