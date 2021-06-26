import { getAllMenus, getDirectory, MenuDir } from "../../lib/page-data";
import Head from "next/head";
import Layout from "../../components/layout";
import ReactMarkdown from "react-markdown";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "../../context/theme-provider";

export type SlugProps = {
  frontMatter: {
    title: string;
  };
  source: string;
  menus: Array<MenuDir>;
};

export default function TutorialPage({
  frontMatter,
  source,
  menus,
}: SlugProps) {
  let theme = useTheme();

  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={theme === "light" ? materialLight : materialDark}
          language={match[1]}
          showLineNumbers
          customStyle={{ borderRadius: "18px" }}
          PreTag="section"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      );
    },
    a(props: any) {
      return <a className="primary" {...props}></a>;
    },
  };

  return (
    <Layout menus={menus}>
      <Head>
        <title>Muxa | {frontMatter.title}</title>
      </Head>
      <main>
        <ReactMarkdown className="markdown-body" components={components}>
          {source}
        </ReactMarkdown>
      </main>
    </Layout>
  );
}

export async function getStaticProps({ params }: any) {
  let turorialDir = getDirectory("tutorial");
  let tutorial = turorialDir.files.find(item => item.slug === params.slug);
  if (!tutorial) return;
  return {
    props: {
      source: tutorial.content,
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
