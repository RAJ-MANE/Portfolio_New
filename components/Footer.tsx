import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} RAJ MANE. ALL RIGHTS RESERVED.
        </p>
        <p className={styles.credit}>
          BUILT BY HUMAN HANDS WITH 🧠 AND 💻 — NEUBRUTALISM STYLE.
        </p>
      </div>
    </footer>
  );
}
