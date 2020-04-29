import Page from "components/page/page";
import { TagsContainer } from "pages/tags/tags.container";
import React from "react";
import { useTranslation } from "react-i18next";

export const TagsPage: React.FC<Props> = ({ hashTags }) => {
  const [t] = useTranslation();
  const title = t(`Tags`);
  return (
    <Page title={title}>
      <TagsContainer hashTags={hashTags} />
    </Page>
  );
};

interface Props {
  hashTags: string[];
}
