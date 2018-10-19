import Page from "components/page/page";
import PasswordChange from "modules/password-change/password-change";
import ProgramDetailsNavigation from "pages/programs/program-details/components/program-details-navigation/program-details-navigation";
import React from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

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
