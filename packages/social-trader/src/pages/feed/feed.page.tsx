import Page from "components/page/page";
import { FeedContainer } from "pages/feed/feed.container";
import React from "react";
import { useTranslation } from "react-i18next";

export const FeedPage: React.FC<Props> = ({ tags }) => {
  const [t] = useTranslation();
  const title = t(`Feed`);
  return (
    <Page title={title}>
      <FeedContainer tags={tags} />
    </Page>
  );
};

interface Props {
  tags: string[];
}
