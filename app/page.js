import Home from "./Home";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

async function getGlobals() {
  return directus.request(readItems("website"));
}

async function getProperties() {
  return directus.request(
    readItems("properties", {
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["*", "images.directus_files_id"],
    })
  );
}

export default async function HomePage() {
  const global = await getGlobals();
  const properties = await getProperties();

  const totalUnits = properties.reduce((total, property) => {
    return total + (property.rent_whole ? 1 : property.unit?.length || 0);
  }, 0);

  return (
    <Home global={global} properties={properties} totalUnits={totalUnits} />
  );
}
