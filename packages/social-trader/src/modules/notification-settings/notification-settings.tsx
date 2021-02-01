import { Row } from "components/row/row";
import { ASSET } from "constants/constants";
import withLoader from "decorators/with-loader";
import { NotificationSettingList } from "gv-api-web";
import { NOTIFICATIONS } from "modules/asset-notifications/asset-notifications.types";
import AssetNotificationsGeneral from "modules/asset-notifications/asset-notifications-general";
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
      label: t("notifications-page:general.news-updates")
    },
    {
      name: NOTIFICATIONS.PlatformEmergency,
      label: t("notifications-page:general.emergency")
    },
    {
      name: NOTIFICATIONS.Social,
      label: t("notifications-page:general.social")
    }
  ];
  return (
    <>
      <Row>
        <AssetNotificationsGeneral
          onSuccess={onSuccess}
          notifications={notificationsGeneral}
          settings={settingsGeneral}
        />
      </Row>
      <Row size={"large"}>
        <NotificationAssets
          condition={!!settingsProgram.length}
          settings={settingsProgram}
          asset={ASSET.PROGRAM}
        />
      </Row>
      <Row size={"large"}>
        <NotificationAssets
          condition={!!settingsFund.length}
          settings={settingsFund}
          asset={ASSET.FUND}
        />
      </Row>
      <Row size={"large"}>
        <NotificationManagers
          condition={settingsManager.length > 0}
          settings={settingsManager}
        />
      </Row>
    </>
  );
};

interface Props {
  onSuccess: VoidFunction;
  settings: NotificationSettingList;
}

const NotificationSettings = React.memo(withLoader(_NotificationSettings));
export default NotificationSettings;
