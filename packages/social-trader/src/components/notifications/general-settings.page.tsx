import Page from "components/page/page";
import NotificationSettingsContainer from "modules/notification-settings/notification-settings-container";
import * as React from "react";
import { useTranslation } from "react-i18next";

const NotificationsPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("notifications-page:title")}>
      <NotificationSettingsContainer />
    </Page>
  );
};

export default NotificationsPage;
