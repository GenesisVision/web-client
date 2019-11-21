import Page from "components/page/page";
import PasswordChange from "modules/password-change/password-change";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _PasswordPage: React.FC<WithTranslation> = ({ t }) => (
  <Page title={t("auth.password-change.title")}>
    <div className="app__main-wrapper">
      <h1>{t("auth.password-change.title")}</h1>
      <PasswordChange />
    </div>
  </Page>
);

const PasswordPage = translate()(React.memo(_PasswordPage));
export default PasswordPage;
