import Page from "components/page/page";
import NotificationSettingsContainer from "modules/notification-settings/notification-settings-container";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _NotificationsPage: React.FC<WithTranslation> = ({ t }) => (
  <Page showTitle title={t("notifications-page.title")}>
    <NotificationSettingsContainer />
  </Page>
);

const NotificationsPage = translate()(React.memo(_NotificationsPage));
export default NotificationsPage;
