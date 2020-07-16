import AddButton from "components/add-button/add-button";
import AssetRow from "components/assets/asset-fields/asset-row";
import { Center } from "components/center/center";
import FormError from "components/form/form-error/form-error";
import FundAssetRatio from "components/fund-asset-ratio/fund-asset-ratio";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetRemoveType
} from "components/fund-asset/fund-asset-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React, { MouseEventHandler, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { PlatformAssetFull } from "utils/types";

import styles from "./assets-block.module.scss";

const _AssetsComponent: React.FC<Props> = ({
  error,
  canChange = true,
  assets = [],
  remainder,
  removeHandle = () => () => {},
  addHandle = () => {}
}) => {
  const [t] = useTranslation();
  const [hoveringAssetName, setHoveringAssetName] = useState<
    string | undefined
  >(undefined);
  const handleHover = useCallback(
    (asset: string) => () => setHoveringAssetName(asset),
    []
  );
  const handleLeave = useCallback(() => setHoveringAssetName(undefined), []);
  const hasNasdaqAssets =
    assets.filter(({ provider }) => provider === "Nasdaq").length > 0;
  return (
    <>
      <Row onlyOffset wide>
        <AssetRow>
          <FundAssetContainer
            assets={assets}
            type={FUND_ASSET_TYPE.MIDDLE}
            removable={canChange}
            removeHandle={removeHandle}
            remainder={remainder}
            hoveringAsset={hoveringAssetName}
          />
        </AssetRow>
        <FundAssetRatio
          values={assets}
          handleHover={handleHover}
          handleLeave={handleLeave}
        />
      </Row>
      {error && (
        <Row>
          <FormError small error={error} />
        </Row>
      )}
      {canChange && (
        <Row>
          <Center
            className={styles["assets-block__add-assets-button"]}
            onClick={addHandle}
          >
            <RowItem>
              <AddButton />
            </RowItem>
            <div>{t("buttons.add-assets")}</div>
          </Center>
        </Row>
      )}
      {hasNasdaqAssets && (
        <Row onlyOffset>
          <Row>
            <Text muted>{t("asset-settings:reallocate.nasdaq-message")}</Text>
          </Row>
          <Row>
            <Text muted>Monday - Friday, 1:30 p.m. - 8:00 p.m. (UTC)</Text>
          </Row>
        </Row>
      )}
    </>
  );
};

interface Props {
  assets: PlatformAssetFull[];
  remainder: number;
  removeHandle?: FundAssetRemoveType;
  addHandle?: MouseEventHandler;
  canChange?: boolean;
  error?: string;
  touched?: boolean;
}

const AssetsComponent = React.memo(_AssetsComponent);
export default AssetsComponent;
