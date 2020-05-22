import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import { ASSET, SIZES } from "constants/constants";
import { IconFavoriteButton } from "modules/toggle-asset-favorite-button/icon-favorite-button";
import { ToggleableAssetType } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.types";
import React from "react";

import styles from "./manager-history-row.module.scss";

interface IManagerHistoryItemProps {
  label: string;
}

interface IManagerHistoryRowProps {
  avatarBlock: JSX.Element;
  tileBlock: JSX.Element;
  dataBlock: JSX.Element;
  asset: ToggleableAssetType;
  assetType: ASSET;
}

export const ManagerHistoryItem: React.FC<IManagerHistoryItemProps> = React.memo(
  ({ label, children }) => {
    return (
      <RowItem xlarge bottomOffset>
        <StatisticItemInner label={label}>{children}</StatisticItemInner>
      </RowItem>
    );
  }
);

export const ManagerHistoryRow: React.FC<IManagerHistoryRowProps> = ({
  avatarBlock,
  tileBlock,
  dataBlock,
  asset,
  assetType
}) => {
  return (
    <tr className={styles["manager-history-row"]}>
      <td>
        <DefaultBlock verticalOffsets={false} size={SIZES.LARGE}>
          <Row />
          <Row large center={false}>
            <RowItem wide bottomOffset>
              <Center wrap>
                <RowItem>{avatarBlock}</RowItem>
                <RowItem>{tileBlock}</RowItem>
              </Center>
            </RowItem>
            {asset.personalDetails && (
              <RowItem>
                <IconFavoriteButton asset={asset} assetType={assetType} />
              </RowItem>
            )}
          </Row>
          <Row className={styles["manager-history-row__data"]}>{dataBlock}</Row>
        </DefaultBlock>
      </td>
    </tr>
  );
};
