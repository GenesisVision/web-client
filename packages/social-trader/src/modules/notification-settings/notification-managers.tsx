import withLoader from "decorators/with-loader";
import { ManagerNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import replaceParams from "utils/replace-params";

import NotificationEntity from "./notification-entity";

const _NotificationManagers: React.FC<Props> = ({ t, settings }) => (
  <div>
    <h3>{t("notifications-page.managers")}</h3>
    <div className="program-notification__list">
      {settings.map(setting => (
        <NotificationEntity
          pathname={""}
          href={replaceParams("/notifications/manager/:id", {
            //TODO: refactor
            ":id": setting.managerId
          })}
          title={setting.username}
          logo={setting.avatar}
          count={setting.settingsGeneral.length}
        />
      ))}
    </div>
  </div>
);

interface Props extends WithTranslation {
  settings: ManagerNotificationSettingList[];
}

const NotificationManagers = React.memo(
  withLoader(translate()(_NotificationManagers))
);
export default NotificationManagers;
