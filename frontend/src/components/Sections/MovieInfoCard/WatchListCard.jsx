import { useState } from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa";

import colors from "../../../sass/colors.module.scss";
import SlideTransition from "../../UI/SlideTransition/SlideTransition";
import { useUser } from "../../contexts/userContext";
import { useDeleteMovie } from "../../hooks/useMovieList";
import { useRateMovie } from "../../hooks/useMovieList";
import Button from "../UI/Button/Button";
import InfoCard from "../UI/InfoCard/InfoCard";
import MovieInfo from "./MovieInfo";
import PlotSection from "./PlotSection";
import RateSection from "./RateSection";
import styles from "./WatchListCard.module.scss";

function WatchListCard({ movie, onClose }) {
  const { myInfo, loggedIn } = useUser();
  const { status: deleteMovieStatus, deleteMovie } = useDeleteMovie();
  const { status: rateMovieStatus, rateMovie } = useRateMovie();
  const [stage, setStage] = useState(true);

  const isAmanda = loggedIn ? myInfo.role === "amanda" : false;

  function handleDeleteMovie(movieId) {
    deleteMovie(movieId, { onSuccess: () => onClose() });
  }

  function handleRateMovie(movieId, rating) {
    rateMovie({ movieId, rating }, { onSuccess: () => onClose() });
  }

  if (!movie) return;

  return (
    <InfoCard title={movie.title} onClose={onClose}>
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

