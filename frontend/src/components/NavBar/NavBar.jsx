import styles from "./NavBar.module.scss";

function NavBar({ children }) {
  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <span role="img"></span>
        <h1>AML</h1>
      </div>
      {children}
    </nav>
  );
}

export default NavBar;
