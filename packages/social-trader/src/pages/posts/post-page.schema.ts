import { SchemaType } from "utils/seo";

export const getPostSchema = ({
  identifier,
  author,
  description,
  logo
}: {
  identifier: string;
  author: string;
  description: string;
  logo?: string;
}): SchemaType => {
  return {
    context: "https://schema.org",
    identifier,
    author,
    description,
    logo: logo || ""
  };
};
