import { getAllMenus, MenuDir, MenuFile } from "../lib/page-data";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import ReactMarkdown from "react-markdown";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "../context/theme-provider";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

export type PageProps = {
  frontMatter: {
    title: string;
    description: string;
    order: number;
  };
  source: string;
  menus: Array<MenuDir>;
};

export default function Pages({ frontMatter, source, menus }: PageProps) {
  let theme = useTheme();
  let router = useRouter();
  let [previousPage, setPreviousPage] = useState<MenuFile | undefined>();
  let [nextPage, setNextPage] = useState<MenuFile | undefined>();

  useEffect(() => {
    let currentDir = menus.find(menu =>
      menu.files.find(
        file =>
          file.data.order === frontMatter.order &&
          frontMatter.title === file.data.title
      )
    );
    setPreviousPage(
      currentDir?.files.find(file => file.data.order === frontMatter.order - 1)
    );
    setNextPage(
      currentDir?.files.find(file => file.data.order === frontMatter.order + 1)
    );
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const components = {
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={theme === "light" ? materialLight : materialDark}
          language={match[1]}
          showLineNumbers
          customStyle={{ borderRadius: "18px" }}
          PreTag="pre"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className="default-code" {...props} children={children} />
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
        <meta name="description" content={frontMatter.description} />
      </Head>
      <main>
        <ReactMarkdown className="markdown-body" components={components}>
          {source}
        </ReactMarkdown>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}>
          {previousPage && (
            <Link href={previousPage.data.link}>
              <a className="primary" style={{ fontSize: "20px" }}>
                ← {previousPage.data.title}
              </a>
            </Link>
          )}
          {nextPage && (
            <Link href={nextPage.data.link}>
              <a className="primary" style={{ fontSize: "20px" }}>
                {nextPage.data.title} →
              </a>
            </Link>
          )}
        </div>
      </main>
    </Layout>
  );
}

type Path = {
  params: {
    slug: Array<string>;
  };
};

export async function getStaticProps({ params }: Path) {
  let menus = getAllMenus();
  let file: MenuFile | undefined;
  for (let menu of menus) {
    for (let item of menu.files) {
      let foundSlug = params.slug.find(slug => slug === item.slug);
      if (foundSlug) {
        // the slug was in this directory
        file = item;
      } else {
        continue;
      }
    }
  }

  // Did not find a page
  if (!file) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      source: file.content,
      frontMatter: file.data,
      menus,
    },
  };
}

export async function getStaticPaths() {
  let menus = getAllMenus();
  let paths: Array<Path> = [];
  for (let menu of menus) {
    for (let file of menu.files) {
      paths.push({
        params: {
          slug: file.data.link.split("/"),
        },
      });
    }
  }

  return {
    paths,
    fallback: true,
  };
}
