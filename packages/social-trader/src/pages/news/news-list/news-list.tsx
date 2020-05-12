import { ConversationPost } from "components/conversation/conversation.types";
import { DefaultBlock } from "components/default.block/default.block";
import { NewsCard } from "pages/news/news.card";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import sizeMe from "react-sizeme";
import StackGrid from "react-stack-grid";
import { DESKTOP, TABLET } from "utils/breakpoints";

import "./react-stack-grid.d.ts";

interface Props {
  skip: number;
  reset?: boolean;
  hasMore?: boolean;
  onScroll: VoidFunction;
  data: ConversationPost[];
}

const getColumnSize = (size?: number): string => {
  if (size === undefined) return "50%";
  if (size > DESKTOP) return "33.33%";
  if (size > TABLET) return "50%";
  return "100%";
};

const OFFSET_HEIGHT = 20;

const _PlateNewsList: React.FC<{
  size?: { height: number; width: number };
  data: ConversationPost[];
}> = ({ data, size }) => {
  const columnSize = getColumnSize(size?.width);
  return (
    <StackGrid
      columnWidth={columnSize}
      gutterWidth={OFFSET_HEIGHT}
      gutterHeight={OFFSET_HEIGHT}
    >
      {data.map(post => (
        <NewsCard key={post.id} post={post} />
      ))}
    </StackGrid>
  );
};

const PlateNewsList = sizeMe()(React.memo(_PlateNewsList));

const _InfiniteScrollNewsList: React.FC<{
  hasMore?: boolean;
  loadMore: VoidFunction;
  data: ConversationPost[];
}> = ({ hasMore, loadMore, data }) => {
  return data.length ? (
    <InfiniteScroll hasMore={hasMore} loadMore={loadMore}>
      <PlateNewsList data={data} />
    </InfiniteScroll>
  ) : (
    <DefaultBlock solid wide>
      Feed is empty
    </DefaultBlock>
  );
};
const InfiniteScrollNewsList = React.memo(_InfiniteScrollNewsList);

const _NewsList: React.FC<Props> = ({ skip, hasMore, data, onScroll }) => {
  const [mergedPosts, setMergedPosts] = useState<ConversationPost[]>([]);

  useEffect(() => {
    setMergedPosts([...(skip ? mergedPosts : []), ...data]);
  }, [data]);

  return (
    <InfiniteScrollNewsList
      data={mergedPosts}
      loadMore={onScroll}
      hasMore={hasMore}
    />
  );
};

export const NewsList = React.memo(_NewsList);
