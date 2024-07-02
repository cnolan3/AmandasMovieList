import { useState } from 'react';
import styles from './MovieListSection.module.scss';

import WatchList from '../WatchList/WatchList';
import SeenList from '../SeenList/SeenList';

function MovieList() {
  const [ tabState, setTabState ] = useState("watchlist");

  return (
    <div className={styles.movieList}>
      <div className={styles.tabRow}>
        <div className={tabState === 'watchlist' ? `${styles.tab} ${styles.active}` : styles.tab} onClick={() => setTabState('watchlist')}>
          <h3>Watchlist</h3>
        </div>
        <div className={tabState === 'seenlist' ? `${styles.tab} ${styles.active}` : styles.tab} onClick={() => setTabState('seenlist')}>
          <h3>Seen</h3>
        </div>
      </div> 
      { tabState === "watchlist" ? <WatchList /> : <SeenList /> }
    </div>  
  )
}


export default MovieList
