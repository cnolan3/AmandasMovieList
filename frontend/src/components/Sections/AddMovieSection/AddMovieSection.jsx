import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { useBlur } from "../../../contexts/BlurContext";
import { useLoadingOverlay } from "../../../contexts/loadingOverlayContext";
import { useSearch } from "../../../contexts/searchContext";
import { useGetMovieById } from "../../../hooks/useMovieData";
import ProtectedPage from "../../../pages/ProtectedPage/ProtectedPage";
import SearchListCard from "../MovieInfoCard/SearchListCard";
import SearchList from "../MovieList/SearchList";
import styles from "./AddMovieSection.module.scss";
import "./transition.css";

function AddMovieSection() {
  const { setIsLoading } = useLoadingOverlay();
  const { setPlaceholder, setQuery, query } = useSearch();
  const { setBlur } = useBlur();
  const [selectedMovieId, setSelectedMovieId] = useState();
  const [showCard, setShowCard] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const {
    movie: selectedMovie,
    error,
    status: movieInfoStatus,
  } = useGetMovieById(selectedMovieId);
  const nodeRef = useRef(null);

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
    setBlur(true);
    setSelectedMovieId(movieId);
  }

  function handleUnselectMovie() {
    setShowCard(false);
    setBlur(false);
  }

  return (
    <ProtectedPage roles={["amanda"]}>
      <div className={styles.addContainer}>
        <div className={styles.addSection}>
          <SearchList
            onSelectMovie={(movieId) => handleSelectMovie(movieId)}
            searchQuery={query}
          />

          <CSSTransition
            nodeRef={nodeRef}
            in={showCard}
            timeout={250}
            classNames="slide-up"
            unmountOnExit
          >
            <div className={styles.infoCard} ref={nodeRef}>
              <SearchListCard
                movie={selectedMovie}
                movieInfoStatus={movieInfoStatus}
                onClose={handleUnselectMovie}
              />
            </div>
          </CSSTransition>
        </div>
      </div>
    </ProtectedPage>
  );
}

export default AddMovieSection;
