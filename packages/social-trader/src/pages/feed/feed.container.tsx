import { getEmptyPostLoaderData } from "components/conversation/conversation.loader";
import { getGlobalFeed } from "components/conversation/conversation.service";
import { PostList } from "components/conversation/post-list/post-list";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import useApiRequest from "hooks/api-request.hook";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { idSelector } from "reducers/header-reducer";

const _FeedContainer: React.FC<Props> = ({ tags }) => {
  const id = useSelector(idSelector);
  const { data, sendRequest } = useApiRequest({
    request: () => getGlobalFeed({ id, tags })
  });
  useEffect(() => {
    sendRequest();
  }, [id]);
  return (
    <div>
      {!tags && <PostInputContainer onSuccess={sendRequest} />}
      <PostList
        loaderData={[getEmptyPostLoaderData()]}
        data={data!?.items}
        updateData={sendRequest}
      />
    </div>
  );
};

interface Props {
  tags: string[];
}

export const FeedContainer = React.memo(_FeedContainer);
