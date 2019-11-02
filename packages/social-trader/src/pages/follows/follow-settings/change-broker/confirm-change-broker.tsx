import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { SetSubmittingType } from "shared/utils/types";

const _ConfirmChangeBroker: React.FC<Props> = ({
  t,
  open,
  onClose,
  brokerFrom,
  brokerTo
}) => {
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
      header={t("follow-settings.broker.text-change-confirm-title")}
      body={t("follow-settings.broker.text-change-confirm", {
        brokerFrom,
        brokerTo
      })}
      applyButtonText={t("buttons.confirm")}
      className="dialog--wider"
    />
  );
};

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  open: boolean;
  onClose(): void;
  brokerFrom?: string;
  brokerTo?: string;
}

const ConfirmChangeBroker = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_ConfirmChangeBroker);
export default ConfirmChangeBroker;
