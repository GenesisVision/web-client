import ConfirmPopup from "components/confirm-popup/confirm-popup";
import { useTranslation } from "i18n";
import React, { useCallback } from "react";

const _ConfirmChangeBroker: React.FC<Props> = ({
  open,
  onClose,
  brokerFrom,
  brokerTo
}) => {
  const [t] = useTranslation();
  const handleApplyClick = useCallback(() => {
    return onClose();
  }, []);

  return (
    <ConfirmPopup
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onApply={handleApplyClick}
      header={t("asset-settings:broker.text-change-confirm-title")}
      body={t("asset-settings:broker.text-change-confirm", {
        brokerFrom,
        brokerTo
      })}
      applyButtonText={t("buttons.confirm")}
    />
  );
};

interface Props {
  open: boolean;
  onApply(): void;
  onClose(): void;
  brokerFrom?: string;
  brokerTo?: string;
}

const ConfirmChangeBroker = React.memo(_ConfirmChangeBroker);
export default ConfirmChangeBroker;
