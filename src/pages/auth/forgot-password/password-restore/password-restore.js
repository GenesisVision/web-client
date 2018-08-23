import "./password-restore.scss";

import qs from "qs";
import React from "react";
import { translate } from "react-i18next";

import PasswordRestoreContainer from "./components/password-restore-container";

const PasswordRestore = ({ location, t }) => {
  const queryParams = qs.parse(location.search.slice(1));
  return (
    <div>
      <h1 className="password-restore__title">
        {t("auth.password-restore.title")}
      </h1>
      <p className="password-restore__text">
        {t("auth.password-restore.new-password.text")}
      </p>
      <PasswordRestoreContainer queryParams={queryParams} />
    </div>
  );
};

export default translate()(PasswordRestore);
