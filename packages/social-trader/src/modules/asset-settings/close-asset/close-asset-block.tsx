import SettingsBlock from "components/settings-block/settings-block";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import CloseAsset, { CloseableAssetType } from "./close-asset";

const _CloseAssetBlock: React.FC<Props> = ({
  asset,
  t,
  label = t("asset-settings:close-asset.title"),
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
  asset: CloseableAssetType;
  id: string;
  canCloseAsset: boolean;
  closeAsset: () => void;
}

const CloseAssetBlock = translate()(React.memo(_CloseAssetBlock));
export default CloseAssetBlock;
