import "../notification-settings/notification-settings.scss";

import { withBlurLoader } from "decorators/with-blur-loader";
import {
  FundNotificationSettingList,
  ProgramNotificationSettingList
} from "gv-api-web";
import AssetNotificationsCustom from "modules/asset-notifications/asset-notifications-custom";
import AssetNotificationsGeneral from "modules/asset-notifications/asset-notifications-general";
import * as React from "react";

import { NotificationsList } from "./asset-notifications.types";

const _AssetNotifications: React.FC<Props> = ({
  onSuccess,
  data,
  notifications
}) => {
  return (
    <div>
      <h3 className="notification-settings__title">{data.title}</h3>
      <AssetNotificationsGeneral
        onSuccess={onSuccess}
        notifications={notifications.general}
        settings={data.settingsGeneral}
        assetId={data.assetId}
      />
      {notifications.custom && (
        <AssetNotificationsCustom
          onSuccess={onSuccess}
          condition={notifications.custom}
          asset={data as ProgramNotificationSettingList}
        />
      )}
    </div>
  );
};

interface Props {
  data: ProgramNotificationSettingList | FundNotificationSettingList;
  onSuccess: VoidFunction;
  notifications: NotificationsList;
}

const AssetNotifications = withBlurLoader(React.memo(_AssetNotifications));
export default AssetNotifications;
