import { ASSETS_TYPES } from "constants/constants";
import AssetNotificationsContainer from "modules/asset-notifications/asset-notifications.container";
import {
  NOTIFICATIONS,
  NotificationsList
} from "modules/asset-notifications/asset-notifications.types";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _FollowNotificationsContainer: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const notifications: NotificationsList = {
    general: [
      {
        name: NOTIFICATIONS.FollowNewsAndUpdates,
        label: t("notifications-page.follow.general.news-updates")
      }
    ],
    custom: false
  };
  return (
    <AssetNotificationsContainer
      assetType={ASSETS_TYPES.Follow}
      id={id}
      notifications={notifications}
    />
  );
};

interface Props {
  id: string;
}

const FollowNotificationsContainer = React.memo(_FollowNotificationsContainer);
export default FollowNotificationsContainer;
