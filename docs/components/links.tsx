import styles from "../styles/links.module.css";
import Link from "next/link";

export default function Links() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "230px" }}>
          <header>
            <h1 className={styles.headerTitle}>
              <Link href="/">
                <a>Muxa</a>
              </Link>
            </h1>
          </header>
          <nav>
            <h3 className={styles.linkTitle}>Tutorial (Start here!)</h3>
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
