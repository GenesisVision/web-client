import { sendReportEvent } from "components/conversation/conversation.ga";
import { report } from "components/conversation/conversation.service";
import { Report } from "components/conversation/message/message-actions/report/report";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { idSelector } from "reducers/header-reducer";
import { postponeCallback } from "utils/hook-form.helpers";

export interface IReportContainerProps {
  onApply?: VoidFunction;
  id: string;
}

const _ReportContainer: React.FC<IReportContainerProps> = ({ onApply, id }) => {
  const [t] = useTranslation();

  const userId = useSelector(idSelector);

  const onApplyMiddleware = postponeCallback(onApply);

  const { sendRequest, errorMessage, status } = useApiRequest({
    request: report,
    middleware: [sendReportEvent, onApplyMiddleware]
  });
  // report throw error TODO discover why
  const handleSubmit = useCallback(
    values => {
      return report({
        ...values,
        id
      })
        .catch(console.log)
        .then(() => {
          onApplyMiddleware({});
          sendReportEvent();
        });
    },
    [id, userId]
  );

  return (
    <>
      <DialogTop title={t("conversation:report.title")} />
      <DialogBottom>
        <Report
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
          status={status}
        />
      </DialogBottom>
    </>
  );
};

const ReportContainer = React.memo(_ReportContainer);
export default ReportContainer;
