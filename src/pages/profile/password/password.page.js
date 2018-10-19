import Page from "components/page/page";
import NavigationBackButton from "modules/navigation-back-button/navigation-back-button";
import PasswordChange from "modules/password-change/password-change";
import React from "react";
import { translate } from "react-i18next";

const PasswordPage = ({ t }) => {
  return (
    <Page title={t("password-page.title")}>
      <NavigationBackButton />
      <h1>{t("password-page.title")}</h1>
      <PasswordChange />
    </Page>
  );
};

export default translate()(PasswordPage);
