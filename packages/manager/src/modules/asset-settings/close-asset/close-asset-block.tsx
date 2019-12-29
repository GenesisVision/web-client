import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { ASSET } from "shared/constants/constants";

import CloseAsset from "./close-asset";

const _CloseAssetBlock: React.FC<Props> = ({
  asset,
  t,
  label = t("manager.asset-settings.close-asset.title"),
  id,
  canCloseAsset,
  closeAsset
}) => (
  <SettingsBlock label={label}>
    <CloseAsset
      asset={asset}
      canClose={canCloseAsset}
      onApply={closeAsset}
      id={id}
    />
  </SettingsBlock>
);

interface Props extends WithTranslation {
  label?: string;
  asset: ASSET;
  id: string;
  canCloseAsset: boolean;
  closeAsset: () => void;
}

const CloseAssetBlock = translate()(React.memo(_CloseAssetBlock));
export default CloseAssetBlock;
