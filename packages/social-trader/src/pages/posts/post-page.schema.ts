import { getImageUrlByQuality } from "components/conversation/conversation-image/conversation-image.helpers";
import { ConversationPost } from "components/conversation/conversation.types";
import { FundDescriptionDataType } from "pages/invest/funds/fund-details/reducers/description.reducer";
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
