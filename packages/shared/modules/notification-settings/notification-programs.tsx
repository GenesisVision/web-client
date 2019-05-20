import { ProgramNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import withLoader from "shared/decorators/with-loader";
import { composeProgramNotificationsUrl } from "shared/utils/compose-url";

import NotificationEntity from "./notification-entity";

const _NotificationPrograms: React.FC<Props> = ({ t, settings }) => (
  <div className="notification-settings">
    <h3 className="notification-settings__subtitle">
      {t("notifications-page.programs")}
    </h3>
    <div className="program-notification__list">
      {settings.map(setting => (
        <NotificationEntity
          href={composeProgramNotificationsUrl(setting.url)}
          level={setting.level}
          key={setting.assetId}
          title={setting.title}
          logo={setting.logo}
          color={setting.color}
          count={setting.settingsCustom.length + setting.settingsGeneral.length}
        />
      ))}
    </div>
  </div>
);

interface Props extends InjectedTranslateProps {
  settings: ProgramNotificationSettingList[];
}

const NotificationPrograms = React.memo(
  withLoader(translate()(_NotificationPrograms))
);
export default NotificationPrograms;
