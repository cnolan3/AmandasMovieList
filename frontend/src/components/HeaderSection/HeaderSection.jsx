import styles from './HeaderSection.module.scss';

function HeaderSection() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.loginRow}>
          <h2>Amandas Movie List</h2>
          <button className={`${styles.btn} ${styles.btnLogin}`}>login</button>
        </div>
        <div className={styles.searchRow}>
          <input className={styles.search} />
        </div>
      </div>
    </div>
  )
}

export default HeaderSection
