import { PublicProfile } from "gv-api-web";
import * as React from "react";
import filesService from "services/file-service";
import { SchemaType } from "utils/seo";

export const getManagerSchema = (details: PublicProfile): SchemaType => ({
  context: "https://schema.org",
  "@type": "Person",
  name: details.username,
  identifier: details.id,
  jobTitle: "Financial Manager",
  description: details.about,
  image: filesService.getFileUrl(details.avatar),
  sameAs: details.socialLinks.map(({ url }) => url)
});
