import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

const DisableSuccess: React.FC<InjectedTranslateProps> = ({ t }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("2fa-page.disable.title")}</h2>
      </div>
      <p>{t("2fa-page.disable.success")}</p>
    </div>
  );
};

const DisableAuthSuccess = translate()(React.memo(DisableSuccess));

export default DisableAuthSuccess;
