import "./notification-settings.scss";

import { ASSET } from "constants/constants";
import withLoader from "decorators/with-loader";
import { NotificationSettingList } from "gv-api-web";
import AssetNotificationsGeneral from "modules/asset-notifications/asset-notifications-general";
import { NOTIFICATIONS } from "modules/asset-notifications/asset-notifications.types";
import * as React from "react";
import { useTranslation } from "react-i18next";

import NotificationAssets from "./notification-assets";
import NotificationManagers from "./notification-managers";

const _NotificationSettings: React.FC<Props> = ({
  onSuccess,
  settings: { settingsGeneral, settingsProgram, settingsFund, settingsManager }
}) => {
  const [t] = useTranslation();
  const notificationsGeneral = [
    {
      name: NOTIFICATIONS.PlatformNewsAndUpdates,
      label: t("notifications-page.general.news-updates")
    },
    {
      name: NOTIFICATIONS.PlatformEmergency,
      label: t("notifications-page.general.emergency")
    }
  ];
  return (
    <div>
      <AssetNotificationsGeneral
        onSuccess={onSuccess}
        notifications={notificationsGeneral}
        settings={settingsGeneral}
      />
      <NotificationAssets
        condition={!!settingsProgram.length}
        settings={settingsProgram}
        asset={ASSET.PROGRAM}
      />
      <NotificationAssets
        condition={!!settingsFund.length}
        settings={settingsFund}
        asset={ASSET.FUND}
      />
      <NotificationManagers
        condition={settingsManager.length > 0}
        settings={settingsManager}
      />
    </div>
  );
};

interface Props {
  onSuccess: VoidFunction;
  settings: NotificationSettingList;
}

const NotificationSettings = React.memo(withLoader(_NotificationSettings));
export default NotificationSettings;
