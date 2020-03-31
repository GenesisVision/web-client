import * as React from "react";
import { useTranslation } from "react-i18next";

import "./email-confirm-failure.scss";

const _EmailConfirmFailure: React.FC<Props> = ({ errorMessage }) => {
  const [t] = useTranslation();
  return (
    <div className="email-confirm-failure">
      <div className="email-confirm-failure__main-text">
        {t("auth.email-confirm.error-during-confirmation")}
      </div>
      <div className="email-confirm-failure__error-text">{errorMessage}</div>
    </div>
  );
};

interface Props {
  errorMessage: string;
}

const EmailConfirmFailure = React.memo(_EmailConfirmFailure);
export default EmailConfirmFailure;
