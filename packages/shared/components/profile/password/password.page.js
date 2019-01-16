import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";
import PasswordChangeContainer from "shared/modules/password-change/password-change";

const PasswordPage = ({ t }) => {
  return (
    <Page title={t("auth.password-change.title")}>
      <div className="app__main-wrapper">
        <h1>{t("auth.password-change.title")}</h1>
        <PasswordChangeContainer />
      </div>
    </Page>
  );
};

export default translate()(PasswordPage);
