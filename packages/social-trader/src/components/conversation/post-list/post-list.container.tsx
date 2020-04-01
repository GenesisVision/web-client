import { getEmptyPostLoaderData } from "components/conversation/conversation.loader";
import { getPosts } from "components/conversation/conversation.service";
import { PostList } from "components/conversation/post-list/post-list";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import { useIsOwnPage } from "components/manager/manager.page.helpers";
import useApiRequest from "hooks/api-request.hook";
import React, { useEffect } from "react";

import "./post-list.scss";

const _PostListContainer: React.FC<Props> = ({ id }) => {
  const isOwnPage = useIsOwnPage(id);
  const { data, sendRequest } = useApiRequest({
    request: () => getPosts({ id, userMode: "ProfileOnlyOwnerPosts" })
  });
  useEffect(() => {
    sendRequest();
  }, [id]);
  return (
    <div>
      {isOwnPage && <PostInputContainer onSuccess={sendRequest} />}
      <PostList
        loaderData={[getEmptyPostLoaderData()]}
        data={data!?.items}
        updateData={sendRequest}
      />
    </div>
  );
};

interface Props {
  id: string;
}

export const PostListContainer = React.memo(_PostListContainer);
