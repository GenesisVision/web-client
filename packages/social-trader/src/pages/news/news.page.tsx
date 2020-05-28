import Page from "components/page/page";
import { NewsContainer } from "pages/news/news.container";
import React from "react";
import { useTranslation } from "react-i18next";

export const NewsPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t(`news-page.title`);
  return (
    <Page title={title}>
      <NewsContainer />
    </Page>
  );
};
