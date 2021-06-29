import styles from "../styles/links.module.css";
import Link from "next/link";
import { MenuDir } from "../lib/page-data";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

export default function Links({ menus }: { menus: Array<MenuDir> }) {
  let router = useRouter();
  let [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    let slugArray = router.query.slug;
    if (Array.isArray(slugArray)) {
      setCurrentPath(slugArray.join("/"));
    }
  }, [router.query.slug]);

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
                    return (
                      <li key={file.slug} className={styles.link}>
                        <Link href={file.data.link}>
                          <a
                            className={
                              currentPath === file.data.link
                                ? styles.activeLink
                                : ""
                            }>
                            {file.data.title}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Fragment>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
