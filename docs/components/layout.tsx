import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import Links from "./links";
import styles from "../styles/layout.module.css";
import { MenuDir } from "../lib/page-data";

export default function Layout({
  children,
  menus,
}: {
  children: ReactNode;
  menus: Array<MenuDir>;
}) {
  return (
    <>
      <Head>
        <title>Muxa</title>
        <meta name="description" content="Async route data in react" />
      </Head>

      <div className={styles.siteLayout}>
        <div className={styles.siteNavbar}>
          <Links menus={menus} />
        </div>
        {children}
      </div>

      <hr style={{ margin: "0px" }} />

      <footer className={styles.footer}>
        <div
          style={{
            display: "flex",
            width: "1300",
            justifyContent: "center",
          }}>
          <div style={{ margin: "50px 0" }}>
            <Link href="/">
              <a className={styles.footerHeader}>Docs</a>
            </Link>
            <Link href="https://www.npmjs.com/package/muxa">
              <a className={styles.footerHeader}>Npm package</a>
            </Link>
            <Link href="https://github.com/tobias-z/muxa">
              <a className={styles.footerHeader}>Github</a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
