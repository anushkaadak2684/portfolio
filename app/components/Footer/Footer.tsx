import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site footer">
      <div className={`container ${styles.inner}`}>
        <span className={styles.name}>Anushka Adak</span>
        <span className={styles.divider} aria-hidden="true">|</span>
        <span className={styles.roles}>Software Developer&nbsp;&bull;&nbsp;Public Speaker</span>
        <span className={styles.divider} aria-hidden="true">|</span>
        <span className={styles.copy}>&copy;&nbsp;{year}</span>
      </div>
    </footer>
  );
}
