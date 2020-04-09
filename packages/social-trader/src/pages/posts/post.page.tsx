import { PostContainer } from "components/conversation/post/post-container";
import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

export const PostPage: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const title = t(`Post`);
  return (
    <Page title={title}>
      <PostContainer id={id} />
    </Page>
  );
};

interface Props {
  id: string;
}
