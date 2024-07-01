import styles from './SeenList.module.scss';

import MovieListItem from '../MovieListItem/MovieListItem';

const seenList = [
  {
    title: "Spider Man: Lost Cause",
    imdbID: "tt2803854",
    poster: "https://m.media-amazon.com/images/M/MV5BYmZkYWRlNWQtOGY0Zi00MWZkLWJiZTktNjRjMDY4MTU2YzAyXkEyXkFqcGdeQXVyMzYzNzc1NjY@._V1_SX300.jpg",
    amandaRating: 3,
  },
  {
    title: "Taxi Driver",
    imdbID: "tt0075314",
    poster: "https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    amandaRating: 3,
  },
  {
    title: "The Ghost Busters",
    imdbID: "tt0072505",
    poster: "https://m.media-amazon.com/images/M/MV5BYjkwZDE1YmMtZjgwNC00NGRjLWEwNTYtMTBkYjFkZjA3ZDc0XkEyXkFqcGdeQXVyMTYzMjc0Nzc3._V1_SX300.jpg",
    amandaRating: 3,
  }
]

function SeenList() {
  return (
    <ul className={styles.seenList}>
      {seenList.map((movie, i) => (
        <MovieListItem movie={movie} position={i + 1} key={movie.imdbID}> 
          <div className={styles.stat}>
            {movie.amandaRating}
          </div>
        </MovieListItem>
      ))}
    </ul>
  )
}


export default SeenList
