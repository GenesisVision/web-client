import { getEmptyPostLoaderData } from "components/conversation/conversation.loader";
import { searchInFeed } from "components/conversation/conversation.service";
import { PostList } from "components/conversation/post-list/post-list";
import { PostInputContainer } from "components/conversation/post/post-input/post-input.container";
import useApiRequest from "hooks/api-request.hook";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { idSelector } from "reducers/header-reducer";

const _TagsContainer: React.FC<Props> = ({ hashTags }) => {
  const id = useSelector(idSelector);
  const { data, sendRequest } = useApiRequest({
    request: () => searchInFeed({ hashTags })
  });
  useEffect(() => {
    sendRequest();
  }, [id]);
  return (
    <div>
      {!hashTags && <PostInputContainer onSuccess={sendRequest} />}
      <PostList
        loaderData={[getEmptyPostLoaderData()]}
        data={data!?.items}
        updateData={sendRequest}
      />
    </div>
  );
};

interface Props {
  hashTags: string[];
}

export const TagsContainer = React.memo(_TagsContainer);
