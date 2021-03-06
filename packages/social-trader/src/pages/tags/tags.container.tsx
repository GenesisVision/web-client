import {
  searchInFeed,
  SearchInFeedValues
} from "components/conversation/conversation.service";
import { PostListWithInput } from "components/conversation/post-list/post-list-with-input";
import React from "react";

const _TagsContainer: React.FC<Props> = ({ hashTags }) => {
  const searchValue: SearchInFeedValues = { hashTags, tagContent: [] };
  return (
    <PostListWithInput
      fetchMethod={searchInFeed(searchValue)}
      showInput={!hashTags}
    />
  );
};

interface Props {
  hashTags: string[];
}

export const TagsContainer = React.memo(_TagsContainer);
