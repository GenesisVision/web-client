import { PublicProfile } from "gv-api-web";
import { SchemaType } from "utils/seo";

export const getManagerSchema = (details: PublicProfile): SchemaType => ({
  context: "https://schema.org",
  "@type": "Person",
  name: details.username,
  identifier: details.id,
  jobTitle: "Financial Manager",
  description: details.about,
  image: details.logoUrl,
  sameAs: details.socialLinks.map(({ url }) => url)
});
