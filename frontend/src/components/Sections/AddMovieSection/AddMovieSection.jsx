import { useEffect, useState } from "react";

import { useIsLoading } from "../../../contexts/loadingContext";
import { useSearch } from "../../../contexts/searchContext";
import { useGetMovieById } from "../../../hooks/useMovieData";
import ProtectedPage from "../../../pages/ProtectedPage/ProtectedPage";
import SearchListCard from "../MovieInfoCard/SearchListCard";
import SeenListCard from "../MovieInfoCard/SeenListCard";
import SearchList from "../MovieList/SearchList";
import SeenList from "../MovieList/SeenList";
import WatchList from "../MovieList/WatchList";
import styles from "./AddMovieSection.module.scss";

function AddMovieSection() {
  const { setIsLoading } = useIsLoading();
  const { setPlaceholder, setQuery, query } = useSearch();
  const [selectedMovieId, setSelectedMovieId] = useState();
  const [showCard, setShowCard] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const {
    movie: selectedMovie,
    error,
    status: movieInfoStatus,
  } = useGetMovieById(selectedMovieId);

  useEffect(() => {
    setPlaceholder("Search movies");
    setQuery("");
  }, []);

  useEffect(() => {
    setIsLoading(movieInfoStatus === "pending");
  }, [movieInfoStatus, setIsLoading]);

  function handleSelectMovie(movieId) {
    setHasShown(true);
    setShowCard(true);
    setSelectedMovieId(movieId);
  }

  function handleUnselectMovie() {
    setShowCard(false);
  }

  return (
    <ProtectedPage roles={["amanda"]}>
      <SearchList
        onSelectMovie={(movieId) => handleSelectMovie(movieId)}
        searchQuery={query}
      />
      <div
        className={`${styles.infoCard}${showCard && movieInfoStatus === "success" ? ` ${styles.show}` : hasShown ? ` ${styles.hide}` : ""}`}
      >
        <SearchListCard
          movie={selectedMovie}
          movieInfoStatus={movieInfoStatus}
          onClose={handleUnselectMovie}
        ></SearchListCard>
      </div>
    </ProtectedPage>
  );
}

export default AddMovieSection;

