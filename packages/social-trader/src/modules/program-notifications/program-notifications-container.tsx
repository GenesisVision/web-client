import { ASSETS_TYPES } from "constants/constants";
import AssetNotificationsContainer from "modules/asset-notifications/asset-notifications.container";
import {
  NOTIFICATIONS,
  NotificationsList
} from "modules/asset-notifications/asset-notifications.types";
import * as React from "react";
import { useTranslation } from "react-i18next";

const ProgramNotificationsContainer: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const notifications: NotificationsList = {
    general: [
      {
        name: NOTIFICATIONS.ProgramNewsAndUpdates,
        label: t("notifications-page:program.general.news-updates")
      },
      {
        name: NOTIFICATIONS.ProgramEndOfPeriod,
        label: t("notifications-page:program.general.end-of-period")
      }
    ],
    custom: true
  };
  return (
    <AssetNotificationsContainer
      assetType={ASSETS_TYPES.Program}
      id={id}
      notifications={notifications}
    />
  );
};
interface Props {
  id: string;
}

export default React.memo(ProgramNotificationsContainer);
