import styles from "./Button.module.scss";

function Button({ onClick, disabled = false, className = "", children }) {
  return (
    <button
      className={`${styles.btn} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

