import Page from "components/page/page";
import ProgramNotificationsContainer from "modules/program-notifications/program-notifications-container";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import BackButton from "components/back-button/back-button";

const ProgramNotificationPage = ({ t, match, service, backPath }) => {
  const { id } = match.params;
  return (
    <Page title={t("notifications.program.title")}>
      <BackButton backPath={backPath} goBack={service.goBack} />
      <h1>{t("notifications.program.title")}</h1>
      <ProgramNotificationsContainer id={id} />
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
)(ProgramNotificationPage);
