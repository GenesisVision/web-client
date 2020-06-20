import { ConversationPost } from "components/conversation/conversation.types";
import { DefaultBlock } from "components/default.block/default.block";
import { MediaPost } from "gv-api-web";
import { NewsCard } from "pages/news/news.card";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import sizeMe from "react-sizeme";
import StackGrid from "react-stack-grid";
import { DESKTOP, TABLET } from "utils/breakpoints";

import "./react-stack-grid.d.ts";

interface Props {
  updateItems: VoidFunction;
  skip: number;
  reset?: boolean;
  hasMore?: boolean;
  onScroll: VoidFunction;
  data: MediaPost[];
}

const getColumnSize = (size?: number): string => {
  if (size === undefined) return "50%";
  if (size > DESKTOP) return "33.33%";
  if (size > TABLET) return "50%";
  return "100%";
};

const OFFSET_HEIGHT = 20;

const _PlateNewsList: React.FC<{
  updateItems: VoidFunction;
  size?: { height: number; width: number };
  data: MediaPost[];
}> = ({ updateItems, data, size }) => {
  const columnSize = getColumnSize(size?.width);
  return (
    <StackGrid
      columnWidth={columnSize}
      gutterWidth={OFFSET_HEIGHT}
      gutterHeight={OFFSET_HEIGHT}
    >
      {data.map(post => (
        <NewsCard updateItems={updateItems} key={post.id} post={post} />
      ))}
    </StackGrid>
  );
};

const PlateNewsList = sizeMe()(React.memo(_PlateNewsList));

const _InfiniteScrollNewsList: React.FC<{
  updateItems: VoidFunction;
  hasMore?: boolean;
  loadMore: VoidFunction;
  data: MediaPost[];
}> = ({ updateItems, hasMore, loadMore, data }) => {
  return data.length ? (
    <InfiniteScroll hasMore={hasMore} loadMore={loadMore}>
      <PlateNewsList updateItems={updateItems} data={data} />
    </InfiniteScroll>
  ) : (
    <DefaultBlock solid wide>
      Feed is empty
    </DefaultBlock>
  );
};
const InfiniteScrollNewsList = React.memo(_InfiniteScrollNewsList);

const _NewsList: React.FC<Props> = ({
  updateItems,
  skip,
  hasMore,
  data,
  onScroll
}) => {
  const [mergedPosts, setMergedPosts] = useState<MediaPost[]>([]);

  useEffect(() => {
    setMergedPosts([...(skip ? mergedPosts : []), ...data]);
  }, [data]);

  if (!mergedPosts.length) return null;
  return (
    <InfiniteScrollNewsList
      updateItems={updateItems}
      data={mergedPosts}
      loadMore={onScroll}
      hasMore={hasMore}
    />
  );
};

export const NewsList = React.memo(_NewsList);
