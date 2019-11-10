import "../create-fund-settings.scss";

import AssetRow from "components/assets/asset-fields/asset-row";
import React, { MouseEventHandler, useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import AddButton from "shared/components/add-button/add-button";
import FundAssetRatio from "shared/components/fund-asset-ratio/fund-asset-ratio";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetRemoveType
} from "shared/components/fund-asset/fund-asset-container";
import { PlatformAssetFull } from "shared/utils/types";

const _CreateFundSettingsAssetsComponent: React.FC<Props> = ({
  touched,
  error,
  canChange = true,
  t,
  assets = [],
  remainder,
  removeHandle = () => () => {},
  addHandle = () => {}
}) => {
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
      <div className="create-fund-settings__assets-and-line">
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
        <div className="create-fund-settings__line">
          <FundAssetRatio
            values={assets}
            handleHover={handleHover}
            handleLeave={handleLeave}
          />
        </div>
      </div>
      {touched && (
        <div className="form-error reallocate-container__form-error">
          {error}
        </div>
      )}
      {canChange && (
        <div className="create-fund-settings__add-assets">
          <div
            className="create-fund-settings__add-assets-button"
            onClick={addHandle}
          >
            <div>
              <AddButton />
            </div>
            <div>{t("buttons.add-assets")}</div>
          </div>
        </div>
      )}
    </>
  );
};

interface Props extends WithTranslation {
  assets: PlatformAssetFull[];
  remainder: number;
  removeHandle?: FundAssetRemoveType;
  addHandle?: MouseEventHandler;
  canChange?: boolean;
  error?: string;
  touched?: boolean;
}

const CreateFundSettingsAssetsComponent = translate()(
  React.memo(_CreateFundSettingsAssetsComponent)
);
export default CreateFundSettingsAssetsComponent;
