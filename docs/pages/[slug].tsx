import Head from "next/head";
import { getAllTutorials } from "../lib/data";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = {
  frontMatter: {
    title: string;
  };
  source: MDXRemoteSerializeResult;
};

export default function Page({ frontMatter, source }: Props) {
  return (
    <>
      <Head>
        <title>Muxa | {frontMatter.title}</title>
      </Head>
      <main>
        <MDXRemote {...source} />
      </main>
    </>
  );
}

export async function getStaticProps({ params }: any) {
  let allTutorials = getAllTutorials();
  let tutorial = allTutorials.find(item => item.slug === params.slug);
  if (!tutorial) return;
  let mdxSource = await serialize(tutorial.content, { scope: tutorial.data });
  return {
    props: {
      source: mdxSource,
      frontMatter: tutorial.data,
    },
  };
}

export async function getStaticPaths() {
  let allTutorials = getAllTutorials();
  let tutorialPaths = allTutorials.map(item => ({
    params: {
      slug: item.slug,
    },
  }));
  return {
    paths: tutorialPaths,
    fallback: false,
  };
}
