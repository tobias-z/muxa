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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faNpm } from "@fortawesome/free-brands-svg-icons";

export type PageProps = {
  frontMatter: {
    title: string;
    description: string;
    order: number;
    link: string;
  };
  source: string;
  menus: Array<MenuDir>;
  directoryName: string;
};

export default function Pages({
  frontMatter,
  source,
  menus,
  directoryName,
}: PageProps) {
  let theme = useTheme();
  let router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  let currentDir = menus.find(menu =>
    menu.files.find(
      file =>
        file.data.order === frontMatter.order &&
        frontMatter.title === file.data.title
    )
  );

  let previousPage = currentDir?.files.find(
    file => file.data.order === frontMatter.order - 1
  );
  let nextPage = currentDir?.files.find(
    file => file.data.order === frontMatter.order + 1
  );

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
      <main style={{ marginBottom: "25px" }}>
        <ReactMarkdown className="markdown-body" components={components}>
          {source}
        </ReactMarkdown>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
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
        <hr style={{ margin: "20px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <a
            className="secondary"
            href={`https://github.com/tobias-z/muxa/tree/main/docs/_content/${directoryName}/${
              frontMatter.link.split("/")[1]
            }.md`}>
            Edit this page on GitHub
          </a>
          <div>
            <Link href="https://www.npmjs.com/package/muxa">
              <a className="picture">
                <span aria-label="Link to npm">
                  <FontAwesomeIcon icon={faNpm} />
                </span>
              </a>
            </Link>
            <Link href="https://github.com/tobias-z/muxa">
              <a className="picture">
                <span aria-label="Link to github">
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </a>
            </Link>
          </div>
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
  let directoryName = "";
  for (let menu of menus) {
    for (let item of menu.files) {
      let foundSlug = params.slug.find(slug => slug === item.slug);
      if (foundSlug) {
        // the slug was in this directory
        file = item;
        directoryName = menu.directoryName;
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
      directoryName,
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
