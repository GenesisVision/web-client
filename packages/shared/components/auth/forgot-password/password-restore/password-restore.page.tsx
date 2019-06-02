import "shared/components/auth/forgot-password/password-restore/password-restore.scss";

import qs from "qs";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import PasswordRestoreContainer from "shared/components/auth/forgot-password/password-restore/password-restore-container";

const _PasswordRestorePage: React.FC<
  { location: Location } & InjectedTranslateProps
> = ({ location, t }) => (
  <div className="password-restore">
    <p className="password-restore__text">
      {t("auth.password-restore.new-password.text")}
    </p>
    <PasswordRestoreContainer
      queryParams={qs.parse(location.search.slice(1))}
    />
  </div>
);

const PasswordRestorePage = React.memo(translate()(_PasswordRestorePage));
export default PasswordRestorePage;
