import * as React from "react";
import { useTranslation } from "react-i18next";

const DisableSuccess: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("2fa-page.disable.title")}</h2>
      </div>
      <p>{t("2fa-page.disable.success")}</p>
    </div>
  );
};

const DisableAuthSuccess = React.memo(DisableSuccess);
export default DisableAuthSuccess;
