import React from "react";
import { translate } from "react-i18next";

const DisableSuccess = ({ t }) => {
  return (
    <div className="dialog__top disable-auth__success">
      <div className="dialog__header">
        <h2>{t("2fa.disable.title")}</h2>
      </div>
      <p>{t("2fa.disable.success")}</p>
    </div>
  );
};

const DisableAuthSuccess = translate()(DisableSuccess);

export default DisableAuthSuccess;
