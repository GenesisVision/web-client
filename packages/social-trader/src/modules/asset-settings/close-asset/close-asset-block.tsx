import SettingsBlock from "components/settings-block/settings-block";
import React from "react";
import { useTranslation } from "react-i18next";

import CloseAsset, { CloseableAssetType } from "./close-asset";

interface Props {
  label?: string;
  asset: CloseableAssetType;
  id: string;
  canCloseAsset: boolean;
  closeAsset: () => void;
}

const _CloseAssetBlock: React.FC<Props> = ({
  asset,
  label,
  id,
  canCloseAsset,
  closeAsset
}) => {
  const [t] = useTranslation();
  return (
    <SettingsBlock label={label || t("asset-settings:close-asset.title")}>
      <CloseAsset
        asset={asset}
        canClose={canCloseAsset}
        onApply={closeAsset}
        id={id}
      />
    </SettingsBlock>
  );
};

const CloseAssetBlock = React.memo(_CloseAssetBlock);
export default CloseAssetBlock;
