import { useEffect, useState } from "react";

import { useLoadingOverlay } from "../../../contexts/loadingOverlayContext";
import { useDeleteMovie, useRateMovie } from "../../../hooks/useMovieList";
import InfoCardBody from "./InfoCardBody";
import LowerSection from "./LowerSection";
import RatingSection from "./RatingSection";

function MovieListCard({
  movie,
  enableNoRateBtnDisable = false,
  rateBtnLabel,
  noRateBtnLabel,
  stageBtnLabelFirst,
  stageBtnLabelSecond,
  onClose,
}) {
  const { setIsLoading } = useLoadingOverlay();
  const { status: deleteMovieStatus, deleteMovie } = useDeleteMovie();
  const { status: rateMovieStatus, rateMovie } = useRateMovie();
  const [stage, setStage] = useState(true);

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
    <InfoCardBody
      movie={movie}
      stage={stage}
      onClose={onClose}
      plotTransitionTo={
        <RatingSection
          disableNoRateBtn={!movie.amandaRating && enableNoRateBtnDisable}
          onRate={(rating) => handleRateMovie(movie.imdbID, rating)}
          rateBtnLabel={rateBtnLabel}
          noRateBtnLabel={noRateBtnLabel}
        />
      }
      lowerSection={
        <LowerSection
          stage={stage}
          setStage={setStage}
          onDelete={() => handleDeleteMovie(movie.imdbID)}
          buttonLabelFirst={stageBtnLabelFirst}
          buttonLabelSecond={stageBtnLabelSecond}
        />
      }
    />
  );
}

export default MovieListCard;

