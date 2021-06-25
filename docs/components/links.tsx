import styles from "../styles/links.module.css";

export default function Links() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "240px" }}>
          <header>
            <h1 style={{ textAlign: "center" }} className={styles.headerTitle}>
              Muxa
            </h1>
          </header>
          <nav>
            <h3 className={styles.linkTitle}>Getting started</h3>
            <ul>
              <li className={styles.link}>Installation</li>
            </ul>
          </nav>
        </div>
        <div className={styles.verticalHr}></div>
      </div>
    </>
  );
}
