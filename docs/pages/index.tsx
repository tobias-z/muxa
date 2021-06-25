import Head from "next/head";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Overridden</title>
      </Head>
      <h1>This is awesome</h1>
    </Layout>
  );
}
