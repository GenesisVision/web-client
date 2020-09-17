import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { ASSET } from "constants/constants";
import { IconFavoriteButton } from "modules/toggle-asset-favorite-button/icon-favorite-button";
import { ToggleableAssetType } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.types";
import React from "react";
import styled from "styled-components";

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

const FavoriteIcon = styled(RowItem)`
  width: 20px;
  height: 19px;
  ${mediaBreakpointLandscapePhone(`
    width: 28px;
    height: 27px;
  `)}
`;

export const ManagerHistoryItem: React.FC<IManagerHistoryItemProps> = React.memo(
  ({ label, children }) => {
    return (
      <RowItem size={"xlarge"} bottomOffset>
        <LabeledValue label={label}>
          <Text wrap={false}>{children}</Text>
        </LabeledValue>
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
        <DefaultBlock verticalOffsets={false} size={"large"}>
          <Row />
          <Row size={"large"} center={false}>
            <RowItem wide bottomOffset>
              <Center wrap>
                <RowItem>{avatarBlock}</RowItem>
                <RowItem>{tileBlock}</RowItem>
              </Center>
            </RowItem>
            {asset.personalDetails && (
              <FavoriteIcon>
                <IconFavoriteButton asset={asset} assetType={assetType} />
              </FavoriteIcon>
            )}
          </Row>
          <Row className={styles["manager-history-row__data"]}>{dataBlock}</Row>
        </DefaultBlock>
      </td>
    </tr>
  );
};
