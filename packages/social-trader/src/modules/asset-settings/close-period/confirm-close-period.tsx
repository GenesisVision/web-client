import ConfirmPopup from "components/confirm-popup/confirm-popup";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { SetSubmittingType } from "utils/types";

const _ConfirmClosePeriod: React.FC<IClosePeriodProps & WithTranslation> = ({
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

const ConfirmClosePeriod = translate()(React.memo(_ConfirmClosePeriod));
export default ConfirmClosePeriod;

export interface IClosePeriodProps {
  id: string;
  service: {
    closePeriod: (
      assetId: string,
      onSuccess: () => void,
      onError: () => void
    ) => void;
  };
  open: boolean;
  onApply(): void;
  onClose(): void;
}
