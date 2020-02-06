import "pages/auth/forgot-password/password-restore/password-restore.scss";

import PasswordRestoreContainer from "pages/auth/forgot-password/password-restore/password-restore-container";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _PasswordRestorePage: React.FC<Props> = ({ code, userId }) => {
  const [t] = useTranslation();
  return (
    <div className="password-restore">
      <p className="password-restore__text">
        {t("auth.password-restore.new-password.text")}
      </p>
      <PasswordRestoreContainer code={code} userId={userId} />
    </div>
  );
};

interface Props {
  userId: string;
  code: string;
}

const PasswordRestorePage = React.memo(_PasswordRestorePage);
export default PasswordRestorePage;
