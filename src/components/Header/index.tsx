import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>TypeATK</h1>
      </div>
    </header>
  );
}
