import { Text } from "components/text/text";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _EmailConfirmSuccess: React.FC = () => {
  const [t] = useTranslation();
  return (
    <div>
      <Text muted>{t("auth:email-confirm.success-alert-message")}</Text>
    </div>
  );
};

const EmailConfirmSuccess = React.memo(_EmailConfirmSuccess);
export default EmailConfirmSuccess;
