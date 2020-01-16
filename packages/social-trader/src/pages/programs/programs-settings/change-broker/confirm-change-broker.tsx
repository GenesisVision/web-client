import ConfirmPopup from "components/confirm-popup/confirm-popup";
import { useTranslation } from "i18n";
import React, { useCallback } from "react";
import { SetSubmittingType } from "utils/types";

const _ConfirmChangeBroker: React.FC<Props> = ({
  open,
  onClose,
  brokerFrom,
  brokerTo
}) => {
  const [t] = useTranslation();
  const handleApplyClick = useCallback((setSubmitting: SetSubmittingType) => {
    onClose();
    setSubmitting(false);
  }, []);

  return (
    <ConfirmPopup
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onApply={handleApplyClick}
      header={t("program-settings.broker.text-change-confirm-title")}
      body={t("program-settings.broker.text-change-confirm", {
        brokerFrom,
        brokerTo
      })}
      applyButtonText={t("buttons.confirm")}
      className="dialog--wider"
    />
  );
};

interface Props {
  open: boolean;
  onClose(): void;
  brokerFrom?: string;
  brokerTo?: string;
}

const ConfirmChangeBroker = React.memo(_ConfirmChangeBroker);
export default ConfirmChangeBroker;
