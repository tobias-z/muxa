import styles from "../styles/links.module.css";
import Link from "next/link";
import { MenuDir } from "../lib/page-data";
import { Fragment } from "react";

export default function Links({ menus }: { menus: Array<MenuDir> }) {
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
            {menus.map(menu => (
              <Fragment key={menu.title}>
                <h3 className={styles.linkTitle}>{menu.title}</h3>
                <ul>
                  {menu.files.map(file => {
                    console.log(file.slug);
                    return (
                      <li key={file.slug} className={styles.link}>
                        <Link href={"/" + file.data.link}>
                          <a>{file.data.title}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Fragment>
            ))}
          </nav>
        </div>
        <div className={styles.verticalHr}></div>
      </div>
    </>
  );
}
