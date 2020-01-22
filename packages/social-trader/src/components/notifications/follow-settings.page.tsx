import Page from "components/page/page";
import FollowNotificationsContainer from "modules/follow-notifications/follow-notifications-container";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _FollowNotificationPage: React.FC<Props> = ({ t, id }) => (
  <Page showTitle title={t("notifications-page.follow.title")}>
    <FollowNotificationsContainer id={id} />
  </Page>
);

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  id: string;
}

const FollowNotificationPage = translate()(React.memo(_FollowNotificationPage));
export default FollowNotificationPage;
