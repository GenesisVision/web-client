import "./email-confirm-failure.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

const _EmailConfirmFailure: React.FC<Props> = ({ t, errorMessage }) => (
  <div className="email-confirm-failure">
    <div className="email-confirm-failure__main-text">
      {t("auth.email-confirm.error-during-confirmation")}
    </div>
    <div className="email-confirm-failure__error-text">{errorMessage}</div>
  </div>
);

interface Props extends InjectedTranslateProps {
  errorMessage: string;
}

const EmailConfirmFailure = translate()(React.memo(_EmailConfirmFailure));
export default EmailConfirmFailure;
