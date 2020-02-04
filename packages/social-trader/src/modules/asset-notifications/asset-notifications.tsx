import withLoader from "decorators/with-loader";
import {
  FundNotificationSettingList,
  ProgramNotificationSettingList
} from "gv-api-web";
import AssetNotificationsCustom from "modules/asset-notifications/asset-notifications-custom";
import AssetNotificationsGeneral from "modules/asset-notifications/asset-notifications-general";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import {
  NotificationsList,
  TAddNotification,
  TRemoveNotification,
  TToggleNotification
} from "./asset-notifications.types";

const _AssetNotifications: React.FC<Props> = ({
  asset,
  notifications,
  addNotification,
  removeNotification,
  toggleNotification
}) => (
  <div>
    <h3 className="notification-settings__title">{asset.title}</h3>
    <AssetNotificationsGeneral
      notifications={notifications.general}
      settings={asset.settingsGeneral}
      assetId={asset.assetId}
      addNotification={addNotification}
      removeNotification={removeNotification}
    />
    <AssetNotificationsCustom
      condition={notifications.custom}
      addNotification={addNotification}
      removeNotification={removeNotification}
      toggleNotification={toggleNotification!}
      asset={asset as ProgramNotificationSettingList}
    />
  </div>
);

interface Props extends WithTranslation {
  asset: ProgramNotificationSettingList | FundNotificationSettingList;
  notifications: NotificationsList;
  addNotification: TAddNotification;
  removeNotification: TRemoveNotification;
  toggleNotification?: TToggleNotification;
}

const AssetNotifications = React.memo(
  withLoader(translate()(_AssetNotifications))
);
export default AssetNotifications;
