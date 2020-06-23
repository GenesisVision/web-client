import ConfirmPopup from "components/confirm-popup/confirm-popup";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { postponeFunc } from "utils/hook-form.helpers";

const _ConfirmCancelChangeBroker: React.FC<Props> = ({
  errorMessage,
  open,
  onApply,
  onClose,
  brokerFrom,
  brokerTo
}) => {
  const [t] = useTranslation();
  const handleApplyClick = useCallback(() => {
    return onApply().then(() => {
      postponeFunc(onClose);
    });
  }, [onApply, onClose]);

  return (
    <ConfirmPopup
      errorMessage={errorMessage}
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onApply={handleApplyClick}
      header={t("asset-settings:broker.text-cancel-confirm-title")}
      body={t("asset-settings:broker.text-cancel-confirm", {
        brokerFrom,
        brokerTo
      })}
      applyButtonText={t("buttons.confirm")}
    />
  );
};

interface Props {
  errorMessage?: string;
  open: boolean;
  onApply: () => Promise<void>;
  onClose: () => void;
  brokerFrom?: string;
  brokerTo?: string;
}

const ConfirmCancelChangeBroker = React.memo(_ConfirmCancelChangeBroker);
export default ConfirmCancelChangeBroker;
