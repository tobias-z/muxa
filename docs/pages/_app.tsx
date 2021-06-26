import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import Links from "../components/links";
import styles from "../styles/_app.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Muxa</title>
        <meta name="description" content="Async route data in react" />
      </Head>

      <div className={styles.siteLayout}>
        <div className={styles.siteNavbar}>
          <Links />
        </div>
        <Component {...pageProps} />
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
export default MyApp;
