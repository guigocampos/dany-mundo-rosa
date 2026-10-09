import type { APIRoute } from "astro";
import { indexable, siteUrl } from "../data/publication";
export const GET: APIRoute = () =>
  new Response(
    indexable && siteUrl
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap.xml", siteUrl).href}\n`
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
