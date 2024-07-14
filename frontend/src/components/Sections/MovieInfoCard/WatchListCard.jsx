import { useEffect, useState } from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa";

import { useLoadingOverlay } from "../../../contexts/loadingOverlayContext";
import { useUser } from "../../../contexts/userContext";
import { useDeleteMovie } from "../../../hooks/useMovieList";
import { useRateMovie } from "../../../hooks/useMovieList";
import colors from "../../../sass/colors.module.scss";
import Button from "../../UI/Button/Button";
import InfoCard from "../../UI/InfoCard/InfoCard";
import SlideTransition from "../../UI/SlideTransition/SlideTransition";
import MovieInfo from "./MovieInfo";
import PlotSection from "./PlotSection";
import RateSection from "./RateSection";
import styles from "./WatchListCard.module.scss";

function WatchListCard({ movie, onClose }) {
  const { setIsLoading } = useLoadingOverlay();
  const { myInfo, loggedIn } = useUser();
  const { status: deleteMovieStatus, deleteMovie } = useDeleteMovie();
  const { status: rateMovieStatus, rateMovie } = useRateMovie();
  const [stage, setStage] = useState(true);

  const isAmanda = loggedIn ? myInfo.role === "amanda" : false;

  useEffect(() => {
    setIsLoading(
      deleteMovieStatus === "pending" || rateMovieStatus === "pending",
    );
  }, [setIsLoading, deleteMovieStatus, rateMovieStatus]);

  function handleDeleteMovie(movieId) {
    setIsLoading(true);
    deleteMovie(movieId, {
      onSuccess: () => {
        setIsLoading(false);
        onClose();
      },
    });
  }

  function handleRateMovie(movieId, rating) {
    setIsLoading(true);
    rateMovie(
      { movieId, rating },
      {
        onSuccess: () => {
          setIsLoading(false);
          onClose();
        },
      },
    );
  }

  if (!movie) return;

  return (
    <InfoCard title={movie.Title} onClose={onClose}>
      <MovieInfo movie={movie}>
        <SlideTransition
          stageState={stage}
          firstComponent={<PlotSection movie={movie} />}
          secondComponent={
            <RateSection
              onRate={(rating) => handleRateMovie(movie.imdbID, rating)}
            />
          }
        />
      </MovieInfo>
      {isAmanda && (
        <div className={styles.lowerSection}>
          <Button
            className={`${styles.deleteBtn} ${!stage ? styles.disabled : ""}`}
            onClick={() => handleDeleteMovie(movie.imdbID)}
            disabled={!stage}
          >
            <FaTrash
              color={
                stage ? colors.colorBackground : colors.colorBackgroundFaded
              }
            />
            Remove
          </Button>
          <Button
            className={styles.rateBtn}
            onClick={() => setStage((stage) => !stage)}
          >
            {stage ? (
              <>
                Move to Seen
                <FaArrowRight color={colors.colorText} />
              </>
            ) : (
              "Cancel Move"
            )}
          </Button>
        </div>
      )}
    </InfoCard>
  );
}

export default WatchListCard;

