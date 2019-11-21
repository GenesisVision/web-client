import Page from "components/page/page";
import FollowNotificationsContainer from "modules/follow-notifications/follow-notifications-container";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _FollowNotificationPage: React.FC<Props> = ({ t, id }) => (
  <Page title={t("notifications-page.program.title")}>
    <div className="app__main-wrapper">
      <h1 className="title-small-padding">
        {t("notifications-page.follow.title")}
      </h1>
      <FollowNotificationsContainer id={id} />
    </div>
  </Page>
);

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  id: string;
}

const FollowNotificationPage = translate()(React.memo(_FollowNotificationPage));
export default FollowNotificationPage;
