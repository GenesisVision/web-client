import ConfirmPopup from "components/confirm-popup/confirm-popup";
import useApiRequest from "hooks/api-request.hook";
import { closePeriod } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { postponeCallback } from "utils/hook-form.helpers";

const _ConfirmClosePeriod: React.FC<IClosePeriodProps> = ({
  open,
  id,
  onApply,
  onClose
}) => {
  const [t] = useTranslation();
  const onCloseMiddleware = postponeCallback(() => {
    onClose();
    onApply();
  });
  const { sendRequest, errorMessage } = useApiRequest({
    request: closePeriod,
    successMessage: "program-details-page.close-period.notification-success",
    middleware: [onCloseMiddleware]
  });
  const handleApplyClick = useCallback(() => {
    return sendRequest(id);
  }, [id]);

  return (
    <ConfirmPopup
      errorMessage={errorMessage}
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

const ConfirmClosePeriod = React.memo(_ConfirmClosePeriod);
export default ConfirmClosePeriod;

export interface IClosePeriodProps {
  id: string;
  open: boolean;
  onApply: () => void;
  onClose: () => void;
}
