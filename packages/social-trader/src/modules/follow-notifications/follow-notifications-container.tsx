import { ProgramNotificationSettingList } from "gv-api-web";
import AssetNotifications from "modules/asset-notifications/asset-notifications";
import {
  NOTIFICATIONS,
  NotificationsList
} from "modules/asset-notifications/asset-notifications.types";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { AuthRootState } from "utils/types";

import {
  addFollowNotification,
  removeFollowNotification,
  toggleFollowNotification
} from "./services/follow-notifications.services";

const _FollowNotificationsContainer: React.FC<Props> = ({ t, follow }) => {
  const notifications: NotificationsList = {
    general: [
      {
        name: NOTIFICATIONS.FollowNewsAndUpdates,
        label: t("notifications-page.follow.general.news-updates")
      }
    ],
    custom: true
  };
  return (
    <AssetNotifications
      condition={!!follow}
      asset={follow!}
      notifications={notifications}
      addNotification={addFollowNotification}
      removeNotification={removeFollowNotification}
      toggleNotification={toggleFollowNotification}
    />
  );
};

const mapStateToProps = (
  { followNotifications }: AuthRootState,
  { id }: OwnProps
): StateProps => ({
  follow: followNotifications[id]
});

interface Props extends OwnProps, StateProps, WithTranslation {}

interface OwnProps {
  id: string;
}

interface StateProps {
  follow?: ProgramNotificationSettingList;
}

const FollowNotificationsContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, null, OwnProps, AuthRootState>(mapStateToProps),
  React.memo
)(_FollowNotificationsContainer);
export default FollowNotificationsContainer;
