import AddButton from "components/add-button/add-button";
import AssetRow from "components/assets/asset-fields/asset-row";
import { Center } from "components/center/center";
import FormError from "components/form/form-error/form-error";
import FundAssetRatio from "components/fund-asset-ratio/fund-asset-ratio";
import FundAssetContainer, {
  FundAssetRemoveType
} from "components/fund-asset/fund-asset-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { ProviderPlatformAssets } from "gv-api-web";
import { generateScheduleText } from "pages/invest/funds/fund-details/services/fund-details.service";
import React, { MouseEventHandler, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";
import { PlatformAssetFull } from "utils/types";

import styles from "./assets-block.module.scss";

const _AssetsComponent: React.FC<Props> = ({
  providers,
  scheduleMessage,
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
  const hasTradingSchedule =
    assets.filter(({ provider }) => provider === "Nasdaq").length > 0;
  const provider =
    providers &&
    safeGetElemFromArray(providers, ({ type }) => type === "Nasdaq");
  const schedule = generateScheduleText(provider?.tradingSchedule);
  return (
    <>
      <Row onlyOffset wide>
        <AssetRow>
          <FundAssetContainer
            assets={assets}
            type={"middle"}
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
      {hasTradingSchedule && (
        <Row onlyOffset>
          <Row>
            <Text muted>{scheduleMessage}</Text>
          </Row>
          <Row>
            <Text muted>{schedule}</Text>
          </Row>
        </Row>
      )}
    </>
  );
};

interface Props {
  providers?: ProviderPlatformAssets[];
  scheduleMessage?: string;
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
