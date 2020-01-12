import "components/auth/forgot-password/password-restore/password-restore.scss";

import PasswordRestoreContainer from "components/auth/forgot-password/password-restore/password-restore-container";
import DetailsBlock from "components/details/details-block";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _PasswordRestorePage: React.FC<Props> = ({ code, userId }) => {
  const [t] = useTranslation();
  return (
    <div className="password-restore">
      <DetailsBlock horizontalPaddings>
        <h3>{t("auth.password-restore.title")}</h3>
        <p className="password-restore__text">
          {t("auth.password-restore.new-password.text")}
        </p>
        <PasswordRestoreContainer code={code} userId={userId} />
      </DetailsBlock>
    </div>
  );
};

interface Props {
  userId: string;
  code: string;
}

const PasswordRestorePage = React.memo(_PasswordRestorePage);
export default PasswordRestorePage;
