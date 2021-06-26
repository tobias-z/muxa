import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Overridden</title>
      </Head>

      <main style={{ marginTop: "20px" }}>
        <h1>Overview</h1>
        <h2>Motivation</h2>
        <h2>The problem</h2>
        <h2>This solution</h2>
      </main>
    </>
  );
}
