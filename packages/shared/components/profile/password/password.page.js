import Page from "shared/components/page/page";
import React from "react";
import { translate } from "react-i18next";
import PasswordChangeContainer from "shared/modules/password-change/password-change";

const PasswordPage = ({ t }) => {
  return (
    <Page title={t("password-page.title")}>
      <h1>{t("password-page.title")}</h1>
      <PasswordChangeContainer />
    </Page>
  );
};

export default translate()(PasswordPage);
