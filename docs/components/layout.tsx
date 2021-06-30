import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import Links from "./links";
import styles from "../styles/layout.module.css";
import { MenuDir } from "../lib/page-data";
import { useTheme } from "../context/theme-provider";

export default function Layout({
  children,
  menus,
}: {
  children: ReactNode;
  menus: Array<MenuDir>;
}) {
  let theme = useTheme();
  let themeColor = theme === "light" ? "white" : "rgba(16, 22, 35, 0.874)";

  return (
    <>
      <Head>
        <title>Muxa</title>
        <meta name="description" content="Async route data in react" />
        <meta name="theme-color" content={themeColor} />
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
