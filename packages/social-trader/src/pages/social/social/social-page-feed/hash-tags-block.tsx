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
  const handleRemoveContentId = useCallback(() => {
    setSearchValue({ ...searchValue, tagContent: undefined });
  }, [searchValue, setSearchValue]);
  const handleHashTag = useCallback(
    (name: string) => {
      const hashTags = searchValue.hashTags?.filter(tag => tag !== name);
      setSearchValue({ ...searchValue, hashTags });
    },
    [searchValue, setSearchValue]
  );
  return (
    <Center>
      {searchValue.tagContent && (
        <HashTag
          color={"#74ffeb"}
          onRemove={handleRemoveContentId}
          name={searchValue.tagContent.name}
        />
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
