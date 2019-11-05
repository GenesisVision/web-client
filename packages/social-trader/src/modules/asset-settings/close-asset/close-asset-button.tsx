import React from "react";
import GVButton from "shared/components/gv-button";
import { ASSET } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { useTranslation } from "shared/i18n";

import ConfirmCloseAssetContainer from "./confirm-close-asset-container";

const _CloseAssetButton: React.FC<Props> = ({
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
        variant={variant}
        color="danger"
        onClick={setOpen}
        disabled={!canClose}
      >
        {t(`asset-settings.buttons.close-${type.toLowerCase()}`)}
      </GVButton>
      <ConfirmCloseAssetContainer
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
  canClose?: boolean;
  id: string;
  onApply?: () => void;
  variant?: "text" | "outlined" | "contained";
  type: ASSET;
}

const CloseAssetButton = React.memo(_CloseAssetButton);
export default CloseAssetButton;
