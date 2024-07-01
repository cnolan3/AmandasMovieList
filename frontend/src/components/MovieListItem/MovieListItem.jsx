import styles from './MovieListItem.module.scss';
import variables from '../../sass/colors.module.scss';

import hexToRGB from '../../utils/hexToRGBA';
import trimSentence from '../../utils/trimSentence';

function MovieListItem({movie, position, children}) {
  const title = trimSentence(movie.title, 35);

  const posterGradient = {
      background: `linear-gradient(to right, ${hexToRGB(variables.colorBackgroundLight, 1)} 66%, 92%, ${hexToRGB(variables.colorBackgroundLight, 0.4)}), url(${movie.poster}) right -10rem center no-repeat`,
  }

  return (
    <li className={styles.movieListItem} style={posterGradient} >
    
      <div className={styles.movieNum}>
        <p>{position}</p>
      </div>

      <div className={styles.movieInfoSection}>
        <div className={styles.movieTitle}>
          <p>{title}</p>
        </div>
        <div className={styles.movieStats}>
          {children}
        </div>
      </div>

      <div className={styles.moviePoster} style={{ backgroundImage: `url(${movie.poster})`}}/>
    </li>
  )
}

export default MovieListItem;