import variables from "../../sass/colors.module.scss";
import hexToRGB from "../../utils/hexToRGBA";
import trimSentence from "../../utils/trimSentence";
import styles from "./MovieListItem.module.scss";

function MovieListItem({ movie, position, onClick, children }) {
  const title = trimSentence(movie.title, 35);

  const posterGradient = {
    background: `linear-gradient(to right, ${hexToRGB(variables.colorBackgroundLight, 1)} 63%, 90%, ${hexToRGB(variables.colorBackgroundLight, 0.5)}), url(${movie.poster}) right -10rem center no-repeat`,
  };

  const normalGradient = {
    background: `linear-gradient(to right, ${hexToRGB(variables.colorBackgroundLight, 1)} 60%, 85%, ${hexToRGB(variables.colorPrimary, 0.5)})`,
  };

  const poster = {
    backgroundImage: `url(${movie.poster})`,
  };

  const emptyPoster = {
    backgroundColor: "rbga(0, 0, 0, 0)",
  };

  return (
    <li
      className={styles.movieListItem}
      style={movie.poster ? posterGradient : normalGradient}
      onClick={onClick}
    >
      <div className={styles.movieNum}>
        <p>{position}</p>
      </div>

      <div className={styles.movieInfoSection}>
        <div className={styles.movieTitle}>
          <p>{title}</p>
        </div>
        <div className={styles.movieStats}>{children}</div>
      </div>

      <div
        className={styles.moviePoster}
        style={movie.poster ? poster : emptyPoster}
      />
    </li>
  );
}

export default MovieListItem;
