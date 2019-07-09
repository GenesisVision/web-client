import "../create-fund-settings.scss";

import { FundAssetPartWithIcon } from "gv-api-web";
import React, { MouseEventHandler, useCallback, useState } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import AddButton from "shared/components/add-button/add-button";
import FundAssetRatio from "shared/components/fund-asset-ratio/fund-asset-ratio";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer, {
  FundAssetRemoveType
} from "shared/components/fund-asset/fund-asset-container";

const _CreateFundSettingsAssetsComponent: React.FC<Props> = ({
  t,
  assets,
  remainder,
  removeHandle,
  addHandle
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
        <div className="create-fund-settings__row create-fund-settings__assets">
          <FundAssetContainer
            assets={assets}
            type={FUND_ASSET_TYPE.MIDDLE}
            removable={true}
            removeHandle={removeHandle}
            remainder={remainder}
            hoveringAsset={hoveringAssetName}
          />
        </div>
        <div className="create-fund-settings__line">
          <FundAssetRatio
            values={assets}
            handleHover={handleHover}
            handleLeave={handleLeave}
          />
        </div>
      </div>
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
    </>
  );
};

interface Props extends InjectedTranslateProps {
  assets: FundAssetPartWithIcon[];
  remainder: number;
  removeHandle: FundAssetRemoveType;
  addHandle: MouseEventHandler;
}

const CreateFundSettingsAssetsComponent = translate()(
  React.memo(_CreateFundSettingsAssetsComponent)
);
export default CreateFundSettingsAssetsComponent;
