import "./email-confirm-failure.scss";

import React from "react";
import { translate } from "react-i18next";

const EmailConfirmFailure = ({ t, errorMessage }) => {
  return (
    <div className="email-confirm-failure">
      <div className="email-confirm-failure__main-text">
        {t("auth.email-confirm.error-during-confirmation")}
      </div>
      <div className="email-confirm-failure__error-text">{errorMessage}</div>
    </div>
  );
};

export default translate()(EmailConfirmFailure);
