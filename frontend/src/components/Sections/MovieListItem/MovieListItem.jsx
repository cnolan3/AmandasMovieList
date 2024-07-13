import colors from "../../../sass/colors.module.scss";
import hexToRGB from "../../../utils/hexToRGBA";
import trimSentence from "../../../utils/trimSentence";
import styles from "./MovieListItem.module.scss";

function MovieListItem({ movie, position, onClick, children }) {
  const title = trimSentence(movie.Title, 35);

  const posterGradient = {
    background: `linear-gradient(to right, ${hexToRGB(colors.colorBackgroundLight, 1)} 63%, 90%, ${hexToRGB(colors.colorBackgroundLight, 0.5)}), url(${movie.Poster}) right -10rem center no-repeat`,
  };

  const normalGradient = {
    background: `linear-gradient(to right, ${hexToRGB(colors.colorBackgroundLight, 1)} 60%, 85%, ${hexToRGB(colors.colorPrimary, 0.5)})`,
  };

  const poster = {
    backgroundImage: `url(${movie.Poster})`,
  };

  const emptyPoster = {
    backgroundColor: "rbga(0, 0, 0, 0)",
  };

  return (
    <li
      className={styles.movieListItem}
      style={movie.Poster ? posterGradient : normalGradient}
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
        style={movie.Poster ? poster : emptyPoster}
      />
    </li>
  );
}

export default MovieListItem;

