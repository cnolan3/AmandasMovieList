import { useState } from "react";

import { useMovieList } from "../../../contexts/MovieListContext";
import Button from "../../UI/Button/Button";
import InfoCard from "../../UI/InfoCard/InfoCard";
import SlideTransition from "../../UI/SlideTransition/SlideTransition";
import AddMovieForm from "../AddMovieForm/AddMovieForm";
import MovieInfo from "./MovieInfo";
import PlotSection from "./PlotSection";
import styles from "./WatchListCard.module.scss";

function SearchListCard({ movie, onClose }) {
  const { seenList, seenListStatus, watchList, watchListStatus } =
    useMovieList();
  const [stage, setStage] = useState(true);

  let found = null;
  if (seenListStatus === "success" && watchListStatus === "success" && movie) {
    const allMovies = [...seenList, ...watchList];

    found = allMovies.find((m) => m.imdbID === movie.imdbID);
  }

  if (!movie) return;

  return (
    <InfoCard title={movie.Title} onClose={onClose}>
      <MovieInfo movie={movie}>
        <SlideTransition stageState={stage}>
          {stage ? (
            <PlotSection movie={movie} />
          ) : (
            <AddMovieForm
              onSubmit={() => {}}
              onSuccess={() => onClose()}
              movieId={movie.imdbID}
            />
          )}
        </SlideTransition>
      </MovieInfo>

      <div className={styles.lowerSection}>
        <Button
          className={`${styles.addBtn} ${found ? styles.disabled : ""}`}
          onClick={() => setStage((stage) => !stage)}
          disabled={found}
        >
          {stage ? "Add to list" : "cancel"}
        </Button>
      </div>
    </InfoCard>
  );
}

export default SearchListCard;

