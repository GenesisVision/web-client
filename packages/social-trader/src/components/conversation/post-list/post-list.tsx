import { ConversationPost } from "components/conversation/conversation.types";
import { PostContainer } from "components/conversation/post/post-container";
import { DefaultBlock } from "components/default.block/default.block";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

interface Props {
  skip: number;
  reset?: boolean;
  hasMore?: boolean;
  onScroll: VoidFunction;
  data: ConversationPost[];
}

const InfiniteScrollPostList: React.FC<{
  hasMore?: boolean;
  loadMore: VoidFunction;
  data: ConversationPost[];
}> = React.memo(({ hasMore, loadMore, data }) => {
  return (
    <InfiniteScroll hasMore={hasMore} loadMore={loadMore}>
      {data.map(post => (
        <Row key={post.id}>
          <PostContainer post={post} id={post.id} />
        </Row>
      ))}
      {!data.length && (
        <DefaultBlock solid wide>
          Feed is empty
        </DefaultBlock>
      )}
    </InfiniteScroll>
  );
});

const _PostList: React.FC<Props> = ({ skip, hasMore, data, onScroll }) => {
  const [mergedPosts, setMergedPosts] = useState<ConversationPost[]>(data);

  useEffect(() => {
    if (skip === 0) setMergedPosts(data);
    else {
      const clearData = data.filter(
        ({ id }) => !mergedPosts.find(post => post.id === id)
      );
      setMergedPosts([...mergedPosts, ...clearData]);
    }
  }, [data]);

  if (!mergedPosts.length) return null;

  return (
    <InfiniteScrollPostList
      data={mergedPosts}
      loadMore={onScroll}
      hasMore={hasMore}
    />
  );
};

export const PostList = withBlurLoader(React.memo(_PostList));
