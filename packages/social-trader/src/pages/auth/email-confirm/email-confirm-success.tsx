import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _EmailConfirmSuccess: React.FC = () => {
  const [t] = useTranslation();
  return (
    <div>
      <MutedText>{t("auth.email-confirm.success-alert-message")}</MutedText>
    </div>
  );
};

const EmailConfirmSuccess = React.memo(_EmailConfirmSuccess);
export default EmailConfirmSuccess;
