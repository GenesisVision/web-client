import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ImageBaseElement from "components/avatar/image-base.element";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { AssetSearchResult } from "components/conversation/conversation.types";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";
import { Clickable } from "utils/types";

import styles from "./search-panel.module.scss";

interface Props extends Clickable {
  asset: AssetSearchResult;
}

const SearchResultRow: React.FC<Props> = ({
  asset: { color, avatar, name, type },
  onClick
}) => {
  const renderAvatar = () => {
    return type === "user" ? (
      <ProfileAvatar url={avatar} alt={name} />
    ) : (
      <AssetAvatar color={color} url={avatar} alt={name} />
    );
  };
  return (
    <Row onClick={onClick} className={styles["search-panel__row"]}>
      <AvatarWithName
        avatar={renderAvatar()}
        name={
          <Center>
            <RowItem>{name}</RowItem>
            <RowItem>
              <Text muted>{type}</Text>
            </RowItem>
          </Center>
        }
      />
    </Row>
  );
};

interface ISearchPanelProps extends Clickable {
  isSearchPending: boolean;
  searchResult?: AssetSearchResult[];
}

const _SearchPanel: React.FC<ISearchPanelProps> = ({
  isSearchPending,
  searchResult,
  onClick
}) => {
  return (
    <div className={styles["search-panel"]}>
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
            className={styles["search-panel__spinner"]}
            src={
              "https://thumbs.gfycat.com/TediousCookedFunnelweaverspider-max-1mb.gif"
            }
          />
        </Row>
      )}
      {!isSearchPending && !searchResult?.length && (
        <Text muted>Not found assets or managers</Text>
      )}
    </div>
  );
};

export const SearchPanel = React.memo(_SearchPanel);
