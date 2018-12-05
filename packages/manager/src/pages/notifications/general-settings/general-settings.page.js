import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";
import NotificationSettingsContainer from "shared/modules/notification-settings/notification-settings-container";

const NotificationsPage = ({ t }) => {
  return (
    <Page title={t("notifications-page.title")}>
      <h1>{t("notifications-page.title")}</h1>
      <NotificationSettingsContainer />
    </Page>
  );
};

export default translate()(NotificationsPage);
