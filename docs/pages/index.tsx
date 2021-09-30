import Head from "next/head";
import Layout from "../components/layout";
import { getAllMenus, MenuDir } from "../lib/page-data";

export default function Home({ menus }: { menus: Array<MenuDir> }) {
  return (
    <Layout menus={menus}>
      <Head>
        <title>Overridden</title>
      </Head>

      <main style={{ marginTop: "20px" }}>
        <h1>Overview</h1>
        <h2>Motivation</h2>
        <p>
          Muxa was inspired by <a href="http://remix.run/">Remix.run</a>
          which I would heavily recommend taking a look at.
        </p>
        <h2>The problem</h2>
        <h2>This solution</h2>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      menus: getAllMenus(),
    },
  };
}
