import Page from "components/page/page";
import FollowNotificationsContainer from "modules/follow-notifications/follow-notifications-container";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _FollowNotificationPage: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  return (
    <Page showTitle title={t("notifications-page.follow.title")}>
      <FollowNotificationsContainer id={id} />
    </Page>
  );
};

interface Props {
  id: string;
}

const FollowNotificationPage = React.memo(_FollowNotificationPage);
export default FollowNotificationPage;
