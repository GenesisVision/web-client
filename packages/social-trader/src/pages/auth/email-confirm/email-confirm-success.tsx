import * as React from "react";
import { useTranslation } from "react-i18next";

import "./email-confirm-failure.scss";

const _EmailConfirmSuccess: React.FC = () => {
  const [t] = useTranslation();
  return (
    <div className="email-confirm-failure">
      <div className="email-confirm-failure__main-text">
        {t("auth.email-confirm.success-alert-message")}
      </div>
    </div>
  );
};

const EmailConfirmSuccess = React.memo(_EmailConfirmSuccess);
export default EmailConfirmSuccess;
