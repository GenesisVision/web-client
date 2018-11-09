import Page from "components/page/page";
import NotificationSettingsContainer from "modules/notification-settings/notification-settings-container";
import React from "react";
import { translate } from "react-i18next";

const NotificationsPage = ({ t }) => {
  return (
    <Page title={t("notifications.title")}>
      <h1>{t("notifications.title")}</h1>
      <NotificationSettingsContainer />
    </Page>
  );
};

export default translate()(NotificationsPage);
