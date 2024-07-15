import { useEffect, useState } from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa";

import { useLoadingOverlay } from "../../../contexts/loadingOverlayContext";
import { useUser } from "../../../contexts/userContext";
import { useDeleteMovie, useRateMovie } from "../../../hooks/useMovieList";
import colors from "../../../sass/colors.module.scss";
import Button from "../../UI/Button/Button";
import InfoCard from "../../UI/InfoCard/InfoCard";
import SlideTransition from "../../UI/SlideTransition/SlideTransition";
import StarRating from "../../UI/StarRating/StarRating";
import MovieInfo from "./MovieInfo";
import PlotSection from "./PlotSection";
import styles from "./SeenListCard.module.scss";

function SeenListCard({ movie, onClose }) {
  const { setIsLoading } = useLoadingOverlay();
  const { myInfo, loggedIn } = useUser();
  const { status: deleteMovieStatus, deleteMovie } = useDeleteMovie();
  const { status: rateMovieStatus, rateMovie } = useRateMovie();
  const [stage, setStage] = useState(true);
  const [ratingState, setRatingState] = useState(1);

  const isAmanda = loggedIn ? myInfo.role === "amanda" : false;

  useEffect(() => {
    setIsLoading(deleteMovieStatus === "pending");
  }, [setIsLoading, deleteMovieStatus]);

  function close() {
    setStage(true);
    onClose();
  }

  function handleDeleteMovie(movieId) {
    deleteMovie(movieId, {
      onSuccess: () => {
        close();
      },
    });
  }

  function handleRateMovie(movieId, rating) {
    rateMovie(
      { movieId, rating },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  }

  if (!movie) return;

  return (
    <InfoCard title={movie.Title} onClose={onClose}>
      <MovieInfo movie={movie}>
        <SlideTransition stageState={stage}>
          {stage ? (
            <PlotSection movie={movie} />
          ) : (
            <div className={styles.rateSection}>
              <StarRating
                color={colors.colorBackground}
                size={25}
                defaultRating={1}
                onSetRating={(r) => setRatingState(r)}
              />

              <Button
                className={styles.rateBtn}
                onClick={() => handleRateMovie(movie.imdbID, ratingState)}
              >
                Rate Movie
              </Button>
              <Button
                className={`${styles.noRateBtn} ${movie.amandaRating ? "" : styles.disabled}`}
                onClick={() => handleRateMovie(movie.imdbID, 0)}
                disabled={!movie.amandaRating}
              >
                Remove Rating
              </Button>
            </div>
          )}
        </SlideTransition>
      </MovieInfo>
      {isAmanda && (
        <div className={styles.lowerSection}>
          <Button
            className={`${styles.deleteBtn} ${stage ? "" : styles.disabled}`}
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
            className={styles.reRateBtn}
            onClick={() => setStage((stage) => !stage)}
          >
            {stage ? (
              <>
                Rate Movie
                <FaArrowRight color={colors.colorText} />
              </>
            ) : (
              "Cancel"
            )}
          </Button>
        </div>
      )}
    </InfoCard>
  );
}

export default SeenListCard;

