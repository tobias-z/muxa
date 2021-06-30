import type { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { getAllMenus } from "../../lib/page-data";

interface SitemapLink {
  url: string;
  changefreq: string;
  priority: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let menus = getAllMenus();
  let links: Array<SitemapLink> = [];

  // Home page is not part of markdown files
  links.push({
    url: "/",
    changefreq: "daily",
    priority: 0.3,
  });

  // Add all markdown file links as pages
  for (let menu of menus) {
    for (let file of menu.files) {
      links.push({
        url: "/" + file.data.link,
        changefreq: "daily",
        priority: 0.3,
      });
    }
  }

  console.log(links);

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then(data => data.toString());

  res.end(xmlString);
};
