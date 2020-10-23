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
import styled from "styled-components";
import { transition } from "utils/style/mixins";
import { Clickable } from "utils/types";

interface Props extends Clickable {
  asset: AssetSearchResult;
}

const RowContainer = styled(Row)`
  cursor: pointer;
  &:hover {
    & span {
      ${transition("color")};
      color: white !important;
    }
  }
`;

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
    <RowContainer onClick={onClick}>
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
    </RowContainer>
  );
};

interface ISearchPanelProps extends Clickable {
  isSearchPending: boolean;
  searchResult?: AssetSearchResult[];
}

const Container = styled.div`
  max-height: 160px;
  overflow-y: scroll;
`;

const Spinner = styled(ImageBaseElement)`
  width: 30px;
  height: 30px;
`;

const _SearchPanel: React.FC<ISearchPanelProps> = ({
  isSearchPending,
  searchResult,
  onClick
}) => {
  return (
    <Container>
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
          <Spinner
            src={
              "https://thumbs.gfycat.com/TediousCookedFunnelweaverspider-max-1mb.gif"
            }
          />
        </Row>
      )}
      {!isSearchPending && !searchResult?.length && (
        <Text muted>Not found assets or managers</Text>
      )}
    </Container>
  );
};

export const SearchPanel = React.memo(_SearchPanel);
