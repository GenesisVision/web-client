import "./notification-settings.scss";

import withLoader from "decorators/with-loader";
import { NotificationSettingList } from "gv-api-web";
import AssetNotificationsGeneral from "modules/asset-notifications/asset-notifications-general";
import { NOTIFICATIONS } from "modules/asset-notifications/asset-notifications.types";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ASSET } from "shared/constants/constants";

import NotificationAssets from "./notification-assets";
import NotificationManagers from "./notification-managers";
import {
  addNotification,
  removeNotification
} from "./services/notification-settings.services";

const _NotificationSettings: React.FC<Props> = ({ t, settings }) => {
  const {
    settingsGeneral,
    settingsProgram,
    settingsFund,
    settingsManager
  } = settings;
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
        notifications={notificationsGeneral}
        settings={settingsGeneral}
        addNotification={addNotification}
        removeNotification={removeNotification}
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

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  settings: NotificationSettingList;
}

const NotificationSettings = React.memo(
  withLoader(translate()(_NotificationSettings))
);
export default NotificationSettings;
