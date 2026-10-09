import type { APIRoute } from "astro";
import { indexable, siteUrl } from "../data/publication";
export const GET: APIRoute = () => {
  const location =
    indexable && siteUrl
      ? `<url><loc>${siteUrl.href.replaceAll("&", "&amp;").replaceAll("<", "&lt;")}</loc></url>`
      : "";
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${location}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
