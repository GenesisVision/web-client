import "./reset-password.scss";

import ResetPasswordContainer from "modules/password-reset/components/reset-password-container/reset-password-container";
import qs from "qs";
import React from "react";
import { translate } from "react-i18next";

const ResetPassword = ({ location, t }) => {
  const queryParams = qs.parse(location.search.slice(1));
  return (
    <div>
      <h1 className="reset-password__title">
        {t("auth.password-restore.title")}
      </h1>
      <p className="reset-password__text">
        {t("auth.password-restore.new-password.text")}
      </p>
      <ResetPasswordContainer queryParams={queryParams} />
    </div>
  );
};

export default translate()(ResetPassword);
