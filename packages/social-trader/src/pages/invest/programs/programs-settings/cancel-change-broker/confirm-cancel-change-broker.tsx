import ConfirmPopup from "components/confirm-popup/confirm-popup";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";

const _ConfirmCancelChangeBroker: React.FC<Props> = ({
  t,
  open,
  onApply,
  onClose,
  brokerFrom,
  brokerTo
}) => {
  const handleApplyClick = useCallback((setSubmitting: SetSubmittingType) => {
    onApply();
    onClose();
    setSubmitting(false);
  }, []);

  return (
    <ConfirmPopup
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onApply={handleApplyClick}
      header={t("program-settings.broker.text-cancel-confirm-title")}
      body={t("program-settings.broker.text-cancel-confirm", {
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
  onApply(): void;
  onClose(): void;
  brokerFrom?: string;
  brokerTo?: string;
}

const ConfirmCancelChangeBroker = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_ConfirmCancelChangeBroker);
export default ConfirmCancelChangeBroker;
