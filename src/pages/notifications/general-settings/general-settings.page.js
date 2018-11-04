import Page from "components/page/page";
import NotificationSettingsContainer from "modules/notification-settings/notification-settings-container";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import BackButton from "components/back-button/back-button";

const NotificationsPage = ({ t, service, backPath }) => {
  return (
    <Page title={t("notifications.title")}>
      {backPath && <BackButton backPath={backPath} goBack={service.goBack} />}
      <h1>{t("notifications.title")}</h1>
      <NotificationSettingsContainer />
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
)(NotificationsPage);
