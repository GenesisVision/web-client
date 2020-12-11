import ConfirmPopup from "components/confirm-popup/confirm-popup";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { postponeCallback } from "utils/hook-form.helpers";
import { PlatformAssetFull } from "utils/types";

const _ConfirmReallocate: React.FC<Props> = ({
  open,
  onApply,
  onClose,
  assets
}) => {
  const [t] = useTranslation();
  const handleApplyClick = useCallback(() => {
    return onApply().then(postponeCallback(onClose));
  }, [onApply, onClose]);
  return (
    <ConfirmPopup
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onApply={handleApplyClick}
      header={t("fund-settings:reallocation.confirm-title")}
      body={
        <>
          <FundAssetContainer assets={assets} type={"middle"} />
          {t("fund-settings:reallocation.confirm-text")}
        </>
      }
      applyButtonText={t("buttons.confirm")}
    />
  );
};

interface Props {
  open: boolean;
  onApply: () => Promise<void>;
  onClose: () => void;
  assets: PlatformAssetFull[];
}

const ConfirmReallocate = React.memo(_ConfirmReallocate);
export default ConfirmReallocate;
