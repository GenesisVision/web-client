import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import {
  ManagerHistoryFavoriteIcon,
  ManagerHistoryRowContainer,
  ManagerHistoryRowData
} from "components/manager/manager-history/manager-history-styles";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { ASSET } from "constants/constants";
import { IconFavoriteButton } from "modules/toggle-asset-favorite-button/icon-favorite-button";
import { ToggleableAssetType } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.types";
import React from "react";

interface IManagerHistoryRowProps {
  avatarBlock: JSX.Element;
  tileBlock: JSX.Element;
  dataBlock: JSX.Element;
  asset: ToggleableAssetType;
  assetType: ASSET;
}

export const ManagerHistoryRow: React.FC<IManagerHistoryRowProps> = ({
  avatarBlock,
  tileBlock,
  dataBlock,
  asset,
  assetType
}) => {
  return (
    <ManagerHistoryRowContainer>
      <td>
        <DefaultBlock verticalOffsets={false} size={"large"}>
          <Row />
          <Row size={"large"} center={false}>
            <RowItem wide bottomOffset>
              <Center wrap>
                <RowItem>{avatarBlock}</RowItem>
                <RowItem>{tileBlock}</RowItem>
              </Center>
            </RowItem>
            {"personalDetails" in asset && (
              <ManagerHistoryFavoriteIcon>
                <IconFavoriteButton asset={asset} assetType={assetType} />
              </ManagerHistoryFavoriteIcon>
            )}
          </Row>
          <ManagerHistoryRowData>{dataBlock}</ManagerHistoryRowData>
        </DefaultBlock>
      </td>
    </ManagerHistoryRowContainer>
  );
};
