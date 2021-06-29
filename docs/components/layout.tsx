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
        <div className={styles.verticalHr}></div>
        {children}
      </div>
    </>
  );
}
