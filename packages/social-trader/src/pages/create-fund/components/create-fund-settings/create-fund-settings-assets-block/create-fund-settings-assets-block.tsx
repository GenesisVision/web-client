import "./create-fund-settings-assets-block.scss";

import AddButton from "components/add-button/add-button";
import AssetRow from "components/assets/asset-fields/asset-row";
import FormError from "components/form/form-error/form-error";
import FundAssetRatio from "components/fund-asset-ratio/fund-asset-ratio";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetRemoveType
} from "components/fund-asset/fund-asset-container";
import WalletWidgetContainer from "components/wallet-widget/wallet-widget-container";
import React, { MouseEventHandler, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { PlatformAssetFull } from "utils/types";

const _CreateFundSettingsAssetsComponent: React.FC<Props> = ({
  touched,
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
  return (
    <>
      <div>
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
        <div className="assets-block__line">
          <FundAssetRatio
            values={assets}
            handleHover={handleHover}
            handleLeave={handleLeave}
          />
        </div>
      </div>
      {touched && (
        <div className="assets-block__line">
          <FormError small error={error} />
        </div>
      )}
      {canChange && (
        <div className="assets-block__add-block">
          <div className="assets-block__add-assets-button" onClick={addHandle}>
            <div className="assets-block__add-button">
              <AddButton />
            </div>
            <div>{t("buttons.add-assets")}</div>
          </div>
        </div>
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

const CreateFundSettingsAssetsComponent = React.memo(
  _CreateFundSettingsAssetsComponent
);
export default CreateFundSettingsAssetsComponent;
