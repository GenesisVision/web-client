import Page from "components/page/page";
import PasswordChange from "modules/password-change/password-change";
import { PROFILE_ROUTE } from "pages/profile/profile/profile.page";
import ProgramDetailsNavigation from "pages/programs/program-details/components/program-details-navigation/program-details-navigation";
import React from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

export const PASSWORD_ROUTE = `${PROFILE_ROUTE}/password`;

const PasswordPage = ({ t, service }) => {
  return (
    <Page title={t("password-page.title")}>
      <ProgramDetailsNavigation goBack={service.goBack} />
      <h1>{t("password-page.title")}</h1>
      <PasswordChange />
    </Page>
  );
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ goBack }, dispatch)
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(PasswordPage);
