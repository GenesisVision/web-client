import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import {
  FollowNotificationSettingList,
  FundNotificationSettingList,
  ProgramNotificationSettingList
} from "gv-api-web";
import AssetNotificationsCustom from "modules/asset-notifications/asset-notifications-custom";
import AssetNotificationsGeneral from "modules/asset-notifications/asset-notifications-general";
import * as React from "react";

import styles from "../notification-settings/notification-settings.module.scss";
import { NotificationsList } from "./asset-notifications.types";

const _AssetNotifications: React.FC<Props> = ({
  onSuccess,
  data,
  notifications
}) => {
  return (
    <>
      <Row>
        <h3 className={styles["notification-settings__title"]}>{data.title}</h3>
      </Row>
      <Row>
        <AssetNotificationsGeneral
          onSuccess={onSuccess}
          notifications={notifications.general}
          settings={data.settingsGeneral}
          assetId={data.assetId}
        />
      </Row>
      {notifications.custom && (
        <Row size={"large"} onlyOffset>
          <AssetNotificationsCustom
            onSuccess={onSuccess}
            condition={notifications.custom}
            asset={data as ProgramNotificationSettingList}
          />
        </Row>
      )}
    </>
  );
};

interface Props {
  data:
    | ProgramNotificationSettingList
    | FundNotificationSettingList
    | FollowNotificationSettingList;
  onSuccess: VoidFunction;
  notifications: NotificationsList;
}

const AssetNotifications = withBlurLoader(React.memo(_AssetNotifications));
export default AssetNotifications;
