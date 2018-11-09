import Page from "components/page/page";
import PasswordChange from "modules/password-change/password-change";
import React from "react";
import { translate } from "react-i18next";

const PasswordPage = ({ t }) => {
  return (
    <Page title={t("password-page.title")}>
      <h1>{t("password-page.title")}</h1>
      <PasswordChange />
    </Page>
  );
};

export default translate()(PasswordPage);
