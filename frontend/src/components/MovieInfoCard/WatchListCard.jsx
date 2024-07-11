import { useRef, useState } from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { useUser } from "../../contexts/userContext";
import { useDeleteMovie } from "../../hooks/useMovieList";
import { useRateMovie } from "../../hooks/useMovieList";
import colors from "../../sass/colors.module.scss";
import Button from "../Button/Button";
import InfoCard from "./InfoCard";
import MovieInfo from "./MovieInfo";
import PlotSection from "./PlotSection";
import RateSection from "./RateSection";
import styles from "./WatchListCard.module.scss";
import "./WatchListCardTransition.css";

function WatchListCard({ movie, onClose }) {
  const { myInfo, loggedIn } = useUser();
  const { status: deleteMovieStatus, deleteMovie } = useDeleteMovie();
  const { status: rateMovieStatus, rateMovie } = useRateMovie();
  const [stage, setStage] = useState(true);
  const plotRef = useRef(null);
  const rateRef = useRef(null);
  const nodeRef = stage ? plotRef : rateRef;

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
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={stage}
            nodeRef={nodeRef}
            addEndListener={(done) => {
              nodeRef.current.addEventListener("transitionend", done, false);
            }}
            classNames={stage ? "fade-left" : "fade-right"}
          >
            <div ref={nodeRef} className={styles.transitionRef}>
              {stage ? (
                <PlotSection movie={movie} />
              ) : (
                <RateSection
                  onRate={(rating) => handleRateMovie(movie.imdbID, rating)}
                />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
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

