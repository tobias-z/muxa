import type { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

interface SitemapLink {
  url: string;
  changefreq: string;
  priority: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let links = getAllLinks();

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

function getAllLinks(): Array<SitemapLink> {
  const links: Array<SitemapLink> = [];

  function addLink(path: string) {
    links.push({
      url: path,
      changefreq: "daily",
      priority: 0.3,
    });
  }

  addLink("/");
  addLink("/getting-started/installation");
  addLink("/getting-started/router-setup");
  addLink("/getting-started/data-loading");
  addLink("/examples/typescript");
  addLink("/examples/nested-routing");
  addLink("/api/router");
  addLink("/api/loaded-route");
  addLink("/api/use-route-data");

  return links;
}
