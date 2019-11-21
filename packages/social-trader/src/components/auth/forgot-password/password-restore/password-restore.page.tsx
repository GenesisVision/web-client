import "components/auth/forgot-password/password-restore/password-restore.scss";

import PasswordRestoreContainer from "components/auth/forgot-password/password-restore/password-restore-container";
import qs from "qs";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _PasswordRestorePage: React.FC<
  { location: Location } & WithTranslation
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

const PasswordRestorePage = translate()(React.memo(_PasswordRestorePage));
export default PasswordRestorePage;
