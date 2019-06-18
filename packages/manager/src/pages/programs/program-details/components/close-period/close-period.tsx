import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { SetSubmittingType } from "shared/utils/types";

const _ClosePeriod: React.FC<IClosePeriodProps & InjectedTranslateProps> = ({
  t,
  open,
  id,
  service,
  onApply,
  onClose
}) => {
  const handleApplyClick = useCallback(
    (setSubmitting: SetSubmittingType) => {
      const successFn = () => {
        onApply();
        onClose();
      };
      const errorFn = () => {
        setSubmitting(false);
      };
      service.closePeriod(id, successFn, errorFn);
    },
    [service, onApply, onClose, id]
  );

  return (
    <ConfirmPopup
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onApply={handleApplyClick}
      header={t("program-details-page.close-period.title")}
      body={t("program-details-page.close-period.body")}
      applyButtonText={t("buttons.confirm")}
      className="dialog--wider"
    />
  );
};

const ClosePeriod = translate()(React.memo(_ClosePeriod));
export default ClosePeriod;

export interface IClosePeriodProps {
  id: string;
  service: {
    closePeriod: (
      programId: string,
      onSuccess: () => void,
      onError: () => void
    ) => void;
  };
  open: boolean;
  onApply(): void;
  onClose(): void;
}
