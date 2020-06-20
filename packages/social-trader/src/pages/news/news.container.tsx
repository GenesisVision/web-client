import { getSocialMedia } from "components/conversation/conversation.service";
import { NewsListWithInput } from "pages/news/news-list/news-list-with-input";
import { INewsListContainerInitData } from "pages/news/news-list/news-list.container";
import React from "react";

interface Props extends INewsListContainerInitData {}

export const NewsContainer: React.FC<Props> = ({ initData }) => {
  return (
    <NewsListWithInput
      initData={initData}
      fetchMethod={getSocialMedia}
      showInput={false}
    />
  );
};
