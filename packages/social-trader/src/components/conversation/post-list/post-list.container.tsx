import { getEmptyPostLoaderData } from "components/conversation/conversation.loader";
import { getPosts } from "components/conversation/conversation.service";
import { PostList } from "components/conversation/post-list/post-list";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import useApiRequest from "hooks/api-request.hook";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { idSelector } from "reducers/header-reducer";

import "./post-list.scss";

const _PostListContainer: React.FC<Props> = ({ id }) => {
  const selfId = useSelector(idSelector);
  const { data, sendRequest } = useApiRequest({
    request: () => getPosts({ id })
  });
  useEffect(() => {
    sendRequest();
  }, [id]);
  return (
    <div className="post-list">
      {selfId === id && <PostInputContainer onSuccess={sendRequest} />}
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
