import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import { SetSubmittingType } from "shared/utils/types";

import { PlatformAssetFull } from "./reallocate-field";

const _ConfirmReallocate: React.FC<Props> = ({
  t,
  open,
  onApply,
  onClose,
  assets
}) => {
  const handleApplyClick = useCallback(
    (setSubmitting: SetSubmittingType) => {
      onApply();
      onClose();
      setSubmitting(false);
    },
    [onApply, onClose]
  );
  return (
    <ConfirmPopup
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onApply={handleApplyClick}
      header={t("manager.fund-settings.reallocation.confirm-title")}
      body={
        <>
          <FundAssetContainer assets={assets} type={FUND_ASSET_TYPE.MIDDLE} />
          {t("manager.fund-settings.reallocation.confirm-text")}
        </>
      }
      applyButtonText={t("buttons.confirm")}
      className="dialog--wider"
    />
  );
};

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  open: boolean;
  onApply(): void;
  onClose(): void;
  assets: PlatformAssetFull[];
}

const ConfirmReallocate = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_ConfirmReallocate);
export default ConfirmReallocate;
