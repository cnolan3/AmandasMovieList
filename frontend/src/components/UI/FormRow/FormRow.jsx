import styles from "./FormRow.module.scss";

// modified from Jonas Schmetdmanns react course on Udemy
function FormRow({ label, error, containerClassName = "", children }) {
  return (
    <div className={styles.formRow}>
      <div className={`${styles.formRowContainer} ${containerClassName}`}>
        {label && <label htmlFor={children.props.id}>{label}</label>}
        {children}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormRow;
