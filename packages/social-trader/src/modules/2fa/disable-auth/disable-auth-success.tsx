import { DialogTop } from "components/dialog/dialog-top";
import * as React from "react";
import { useTranslation } from "react-i18next";

const DisableSuccess: React.FC = () => {
  const { t } = useTranslation();
  return (
    <DialogTop
      title={t("2fa-page.profile-page.disable.title")}
      subtitle={t("2fa-page.profile-page.disable.success")}
    />
  );
};

const DisableAuthSuccess = React.memo(DisableSuccess);
export default DisableAuthSuccess;
