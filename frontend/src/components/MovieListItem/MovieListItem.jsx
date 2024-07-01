import styles from './MovieListItem.module.scss';

function MovieListItem({movie, position, children}) {
  const {title, poster, rottenRating, runtime } = movie;

  const titleMaxCharacters = 35;
  let trimmedTitle = title;
  if (title.length > titleMaxCharacters) {
    trimmedTitle = title.substr(0, titleMaxCharacters);

    if (title[titleMaxCharacters + 1] !== ' ') {
      trimmedTitle = trimmedTitle.substr(0, trimmedTitle.lastIndexOf(' '));
    }
    
    trimmedTitle = `${trimmedTitle}...`;
  }

  return (
    <li className={styles.movieListItem} style={{ background: `linear-gradient(to right, rgba(251, 253, 255, 1) 66%, 92%, rgba(211, 212, 214, 0.5)), url(${poster}) right -10rem center no-repeat`}} >
    
      <div className={styles.movieNum}>
        <p>{position}</p>
      </div>

      <div className={styles.movieInfoSection}>
        <div className={styles.movieTitle}>
          <p>{trimmedTitle}</p>
        </div>
        <div className={styles.movieStats}>
          {children}
        </div>
      </div>

      <div className={styles.moviePoster} style={{ backgroundImage: `url(${poster})`}}/>
    </li>
  )
}

export default MovieListItem;