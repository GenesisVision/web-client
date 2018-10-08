import Page from "components/page/page";
import NotificationSettingsContainer from "modules/notification-settings/notification-settings-container";
import ProgramDetailsNavigation from "pages/programs/program-details/components/program-details-navigation/program-details-navigation";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

const NotificationsPage = ({ t, service }) => {
  return (
    <Page title={t("notifications.title")}>
      <ProgramDetailsNavigation goBack={service.goBack} />
      <h1>{t("notifications.title")}</h1>
      <NotificationSettingsContainer />
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
)(NotificationsPage);
