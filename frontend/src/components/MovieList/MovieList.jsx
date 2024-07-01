import { useState } from 'react';
import styles from './MovieList.module.scss';

import WatchList from '../WatchList/WatchList';
import SeenList from '../SeenList/SeenList';

function MovieList() {
  const [ tabState, setTabState ] = useState("seenlist");

  console.log(tabState);
  return (
    <>
      { tabState === "watchlist" ? <WatchList /> : <SeenList /> }
    </>
  )
}


export default MovieList
