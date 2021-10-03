import Head from "next/head";
import Layout from "../components/layout";
import { getAllMenus, MenuDir } from "../lib/page-data";

export async function getStaticProps() {
  return {
    props: {
      menus: getAllMenus(),
    },
  };
}

export default function Home({ menus }: { menus: Array<MenuDir> }) {
  return (
    <Layout menus={menus}>
      <Head>
        <title>Muxa | Introduction</title>
      </Head>

      <main style={{ marginTop: "20px" }}>
        <h1>Overview</h1>
        <h3>Routing</h3>
        <p>
          Muxa removes the problem of manually creating routes when using client
          side React. Instead they are created through your projects folder
          structure.
        </p>
        <p>
          Anything inside of your <code className="default-code">routes</code>{" "}
          directory will be interpreted as a route in your project!
        </p>
        <h3>Managing large components</h3>
        <p>
          Sometimes when you are creating a component in React, you may find
          yourself making the component responsible for a whole lot of stuff. A
          pretty common occurrence is that it does three things:
        </p>
        <ul>
          <li>Fetches data</li>
          <li>Mutates data</li>
          <li>Displays the data</li>
        </ul>
        <p>
          Muxa tries to solve this, by intoducing an old web development pattern
          called, POST redirect GET.
        </p>
        <p>
          Now instead of having everything inside of your component, you can now
          make it responsible for only displaying the data. You can then export
          two functions called <code className="default-code">loader</code> and{" "}
          <code className="default-code">action</code> which are both getting
          and posting respectively
        </p>
        <h2>Motivation</h2>
        <p>
          Muxa was inspired by{" "}
          <strong>
            <a href="http://remix.run/">Remix.run</a>
          </strong>{" "}
          which I would heavily recommend taking a look at.
        </p>
      </main>
    </Layout>
  );
}
