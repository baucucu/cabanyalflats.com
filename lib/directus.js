import { createDirectus, staticToken, rest } from "@directus/sdk";

const directus = createDirectus("https://cabanyalflats.appy.agency")
  .with(staticToken(process.env.DIRECTUS_TOKEN))
  .with(
    rest({
      onRequest: (options) => ({ ...options, cache: "no-store" }),
    })
  );

export default directus;
