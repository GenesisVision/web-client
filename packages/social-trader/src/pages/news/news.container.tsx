import { getSocialMedia } from "components/conversation/conversation.service";
import { NewsListWithInput } from "pages/news/news-list/news-list-with-input";
import React from "react";

export const NewsContainer: React.FC = () => {
  return <NewsListWithInput fetchMethod={getSocialMedia} showInput={false} />;
};
