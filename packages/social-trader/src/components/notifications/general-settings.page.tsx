import Page from "components/page/page";
import NotificationSettingsContainer from "modules/notification-settings/notification-settings-container";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _NotificationsPage: React.FC<WithTranslation> = ({ t }) => (
  <Page title={t("notifications-page.title")}>
    <div className="app__main-wrapper">
      <h1>{t("notifications-page.title")}</h1>
      <NotificationSettingsContainer />
    </div>
  </Page>
);

const NotificationsPage = translate()(React.memo(_NotificationsPage));
export default NotificationsPage;
