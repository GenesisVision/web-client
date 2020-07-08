import {
  FUND_NOTIFICATIONS_FOLDER_ROUTE,
  PROGRAM_NOTIFICATIONS_FOLDER_ROUTE
} from "components/notifications/notifications.routes";
import { Row } from "components/row/row";
import { ASSET } from "constants/constants";
import withLoader from "decorators/with-loader";
import {
  FundNotificationSettingList,
  ProgramNotificationSettingList
} from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { composeAssetNotificationsUrl } from "utils/compose-url";

import NotificationEntity from "./notification-entity";
import styles from "./notification-settings.module.scss";

const _NotificationAssets: React.FC<Props> = ({ settings, asset }) => {
  const [t] = useTranslation();
  return (
    <div className={styles["notification-settings"]}>
      <Row>
        <h3 className={styles["notification-settings__subtitle"]}>
          {t(`notifications-page:${asset.toLowerCase()}s`)}
        </h3>
      </Row>
      <Row wide onlyOffset>
        {settings.map(setting => (
          <NotificationEntity
            levelProgress={
              "levelProgress" in setting ? setting.levelProgress : undefined
            }
            pathname={
              asset === ASSET.PROGRAM
                ? PROGRAM_NOTIFICATIONS_FOLDER_ROUTE
                : FUND_NOTIFICATIONS_FOLDER_ROUTE
            }
            href={composeAssetNotificationsUrl(setting.url, asset)}
            level={"level" in setting ? setting.level : undefined}
            key={setting.assetId}
            title={setting.title}
            logo={setting.logoUrl}
            color={setting.color}
            count={
              ("settingsCustom" in setting
                ? setting.settingsCustom.length
                : 0) + setting.settingsGeneral.length
            }
          />
        ))}
      </Row>
    </div>
  );
};

interface Props {
  settings: Array<ProgramNotificationSettingList | FundNotificationSettingList>;
  asset: ASSET;
}

const NotificationAssets = React.memo(withLoader(_NotificationAssets));
export default NotificationAssets;
