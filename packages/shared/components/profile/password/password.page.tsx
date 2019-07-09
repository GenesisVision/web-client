import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Page from "shared/components/page/page";
import PasswordChange from "shared/modules/password-change/password-change";

const _PasswordPage: React.FC<InjectedTranslateProps> = ({ t }) => (
  <Page title={t("auth.password-change.title")}>
    <div className="app__main-wrapper">
      <h1>{t("auth.password-change.title")}</h1>
      <PasswordChange />
    </div>
  </Page>
);

const PasswordPage = translate()(React.memo(_PasswordPage));
export default PasswordPage;
