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
  return [
    { url: "/", changefreq: "daily", priority: 0.3 },
    {
      url: "/getting-started/installation",
      changefreq: "daily",
      priority: 0.3,
    },
    {
      url: "/getting-started/router-setup",
      changefreq: "daily",
      priority: 0.3,
    },
    {
      url: "/getting-started/data-loading",
      changefreq: "daily",
      priority: 0.3,
    },
    { url: "/examples/typescript", changefreq: "daily", priority: 0.3 },
    {
      url: "/examples/nested-routing",
      changefreq: "daily",
      priority: 0.3,
    },
    { url: "/api/router", changefreq: "daily", priority: 0.3 },
    { url: "/api/loaded-route", changefreq: "daily", priority: 0.3 },
    { url: "/api/use-route-data", changefreq: "daily", priority: 0.3 },
  ];
}
