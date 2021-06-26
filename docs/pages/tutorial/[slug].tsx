import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getAllMenus, getDirectory, MenuDir } from "../../lib/page-data";
import Head from "next/head";
import Layout from "../../components/layout";

export type SlugProps = {
  frontMatter: {
    title: string;
  };
  source: MDXRemoteSerializeResult;
  menus: Array<MenuDir>;
};

export default function TutorialPage({
  frontMatter,
  source,
  menus,
}: SlugProps) {
  return (
    <Layout menus={menus}>
      <Head>
        <title>Muxa | {frontMatter.title}</title>
      </Head>
      <main>
        <MDXRemote {...source} />
      </main>
    </Layout>
  );
}

export async function getStaticProps({ params }: any) {
  let turorialDir = getDirectory("tutorial");
  let tutorial = turorialDir.files.find(item => item.slug === params.slug);
  if (!tutorial) return;
  let mdxSource = await serialize(tutorial.content, { scope: tutorial.data });
  return {
    props: {
      source: mdxSource,
      frontMatter: tutorial.data,
      menus: getAllMenus(),
    },
  };
}
export async function getStaticPaths() {
  let tutorialDir = getDirectory("tutorial");
  let tutorialPaths = tutorialDir.files.map(item => ({
    params: {
      slug: item.slug,
    },
  }));
  return {
    paths: tutorialPaths,
    fallback: false,
  };
}
