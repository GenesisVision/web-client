import { ASSETS_TYPES } from "constants/constants";
import AssetNotificationsContainer from "modules/asset-notifications/asset-notifications.container";
import {
  NOTIFICATIONS,
  NotificationsList
} from "modules/asset-notifications/asset-notifications.types";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _FundNotificationsContainer: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const notifications: NotificationsList = {
    general: [
      {
        name: NOTIFICATIONS.FundNewsAndUpdates,
        label: t("notifications-page.fund.general.news-updates")
      },
      {
        name: NOTIFICATIONS.FundRebalancing,
        label: t("notifications-page.fund.general.fund-rebalancing")
      }
    ],
    custom: false
  };
  return (
    <AssetNotificationsContainer
      assetType={ASSETS_TYPES.Fund}
      id={id}
      notifications={notifications}
    />
  );
};

interface Props {
  id: string;
}

const FundNotificationsContainer = React.memo(_FundNotificationsContainer);
export default FundNotificationsContainer;
