const configuredUrl = import.meta.env.PUBLIC_SITE_URL;
export const siteUrl = configuredUrl ? new URL(configuredUrl) : null;
if (siteUrl && siteUrl.protocol !== "https:")
  throw new Error("PUBLIC_SITE_URL deve usar HTTPS.");
export const indexable =
  import.meta.env.PUBLIC_INDEXABLE === "true" && siteUrl !== null;
