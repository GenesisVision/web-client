import Page from "components/page/page";
import { INewsListContainerInitData } from "pages/news/news-list/news-list.container";
import { NewsContainer } from "pages/news/news.container";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props extends INewsListContainerInitData {}

export const NewsPage: React.FC<Props> = ({ initData }) => {
  const [t] = useTranslation();
  const title = t(`news-page.title`);
  return (
    <Page title={title}>
      <NewsContainer initData={initData} />
    </Page>
  );
};
