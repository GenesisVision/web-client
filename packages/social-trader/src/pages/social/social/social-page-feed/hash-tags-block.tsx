import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { HashTag } from "pages/social/social/social-page-feed/hash-tag";
import { HashTagAdd } from "pages/social/social/social-page-feed/hash-tag-add";
import { SocialSearchContext } from "pages/social/social/social-page.context";
import React, { useCallback, useContext } from "react";
import { getRandomColor } from "utils/helpers";

interface Props {}

const _HashTagsBlock: React.FC<Props> = () => {
  const { setSearchValue, searchValue } = useContext(SocialSearchContext);
  const handleRemoveContentId = useCallback(
    (name: string) => {
      const tagContent = searchValue.tagContent?.filter(
        tag => tag.name !== name
      );
      setSearchValue({ ...searchValue, tagContent });
    },
    [searchValue, setSearchValue]
  );
  const handleHashTag = useCallback(
    (name: string) => {
      const hashTags = searchValue.hashTags?.filter(tag => tag !== name);
      setSearchValue({ ...searchValue, hashTags });
    },
    [searchValue, setSearchValue]
  );
  return (
    <Center>
      {!!searchValue.tagContent.length && (
        <RowItem>
          <Center>
            {searchValue.tagContent.map(({ name }) => (
              <HashTag
                color={getRandomColor()}
                onRemove={handleRemoveContentId}
                name={name}
              />
            ))}
          </Center>
        </RowItem>
      )}
      {!!searchValue.hashTags.length && (
        <RowItem>
          <Center>
            {searchValue.hashTags.map(tag => (
              <HashTag
                color={getRandomColor()}
                onRemove={handleHashTag}
                name={tag}
              />
            ))}
          </Center>
        </RowItem>
      )}
      <RowItem>
        <HashTagAdd />
      </RowItem>
    </Center>
  );
};

export const HashTagsBlock = React.memo(_HashTagsBlock);
