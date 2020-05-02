import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ImageBaseElement from "components/avatar/image-base.element";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { AssetSearchResult } from "components/conversation/conversation.types";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

import styles from "./search-panel.module.scss";

const SearchResultRow: React.FC<{
  asset: AssetSearchResult;
  onClick: VoidFunction;
}> = ({ asset: { avatar, name, type }, onClick }) => {
  return (
    <Row onClick={onClick} className={styles["search-panel__row"]}>
      <AvatarWithName
        avatar={<ProfileAvatar url={avatar} alt={name} />}
        name={
          <Center>
            <RowItem>{name}</RowItem>
            <RowItem>
              <MutedText>{type}</MutedText>
            </RowItem>
          </Center>
        }
      />
    </Row>
  );
};

const _SearchPanel: React.FC<{
  isSearchPending: boolean;
  searchResult?: AssetSearchResult[];
  onClick: (values: AssetSearchResult) => void;
}> = ({ isSearchPending, searchResult, onClick }) => {
  return (
    <div className="search-panel">
      {!!searchResult?.length &&
        searchResult?.map(asset => (
          <SearchResultRow
            onClick={() => onClick(asset)}
            asset={asset}
            key={asset.id}
          />
        ))}
      {isSearchPending && (
        <Row>
          <ImageBaseElement
            className="search-panel__spinner"
            src={
              "https://thumbs.gfycat.com/TediousCookedFunnelweaverspider-max-1mb.gif"
            }
          />
        </Row>
      )}
      {!isSearchPending && !searchResult?.length && (
        <MutedText>Not found assets or managers</MutedText>
      )}
    </div>
  );
};

export const SearchPanel = React.memo(_SearchPanel);
