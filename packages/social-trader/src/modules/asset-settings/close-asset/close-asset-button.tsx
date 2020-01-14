import GVButton from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import { useTranslation } from "i18n";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import React from "react";

import ConfirmCloseAssetContainer from "./confirm-close-asset-container";

const _CloseAssetButton: React.FC<Props> = ({
  noPadding,
  assetName,
  variant = "contained",
  canClose = true,
  type,
  id,
  onApply = () => {}
}) => {
  const [t] = useTranslation();
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <GVButton
        noPadding={noPadding}
        variant={variant}
        color="danger"
        onClick={setOpen}
        disabled={!canClose}
      >
        {t(`asset-settings.buttons.close-${type.toLowerCase()}`)}
      </GVButton>
      <ConfirmCloseAssetContainer
        assetName={assetName}
        asset={type}
        open={isOpen}
        onClose={setClose}
        onApply={onApply}
        id={id}
      />
    </>
  );
};

interface Props {
  noPadding?: boolean;
  assetName?: string;
  canClose?: boolean;
  id: string;
  onApply?: () => void;
  variant?: "text" | "outlined" | "contained";
  type: CLOSEABLE_ASSET;
}

const CloseAssetButton = React.memo(_CloseAssetButton);
export default CloseAssetButton;
