import Page from "components/page/page";
import PasswordChange from "modules/password-change/password-change";
import React from "react";
import { translate } from "react-i18next";
import { bindActionCreators, compose } from "redux";
import connect from "react-redux/es/connect/connect";
import { goBack } from "react-router-redux";
import BackButton from "components/back-button/back-button";

const PasswordPage = ({ t, backPath, service }) => {
  return (
    <Page title={t("password-page.title")}>
      {backPath && <BackButton backPath={backPath} goBack={service.goBack} />}
      <h1>{t("password-page.title")}</h1>
      <PasswordChange />
    </Page>
  );
};

const mapStateToProps = state => ({
  backPath: state.routing.location.state
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ goBack }, dispatch)
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PasswordPage);
