import { getPost } from "components/conversation/conversation.service";
import { Post } from "components/conversation/post/post";
import Page from "components/page/page";
import useApiRequest from "hooks/api-request.hook";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const PostPage: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const title = t(`Post`);
  const { data, sendRequest } = useApiRequest({
    request: () => getPost({ id }),
    fetchOnMount: true
  });
  useEffect(() => {
    sendRequest();
  }, [id]);
  if (!data) return null;
  return (
    <Page title={title}>
      <Post post={data} updateData={sendRequest} />
    </Page>
  );
};

interface Props {
  id: string;
}
