export default function filterMovieList(movieList, query) {
  if (query && movieList)
    return movieList.filter((movie) =>
      movie.Title.toLowerCase().includes(query.toLowerCase()),
    );

  return movieList;
}
