import { Row } from "components/row/row";
import withLoader from "decorators/with-loader";
import { ManagerNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import replaceParams from "utils/replace-params";

import NotificationEntity from "./notification-entity";

interface Props {
  settings: ManagerNotificationSettingList[];
}

const _NotificationManagers: React.FC<Props> = ({ settings }) => {
  const [t] = useTranslation();
  return (
    <div>
      <h3>{t("notifications-page:managers")}</h3>
      <Row wide onlyOffset>
        {settings.map(setting => (
          <NotificationEntity
            pathname={""}
            href={replaceParams("/notifications/manager/:id", {
              //TODO: refactor
              ":id": setting.managerId
            })}
            title={setting.username}
            logo={setting.logoUrl}
            count={setting.settingsGeneral.length}
          />
        ))}
      </Row>
    </div>
  );
};

const NotificationManagers = React.memo(withLoader(_NotificationManagers));
export default NotificationManagers;
