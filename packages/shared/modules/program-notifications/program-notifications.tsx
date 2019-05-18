import { ProgramNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { translate } from "react-i18next";
import withLoader from "shared/decorators/with-loader";
import ProgramNotificationsCustom from "shared/modules/program-notifications/program-notifications-custom";

import ProgramNotificationsGeneral from "./program-notifications-general";

const _ProgramNotifications: React.FC<{
  program: ProgramNotificationSettingList;
}> = ({ program }) => (
  <div>
    <h3 className="notification-settings__title">{program.title}</h3>
    <ProgramNotificationsGeneral
      settings={program.settingsGeneral}
      assetId={program.assetId}
    />
    <ProgramNotificationsCustom program={program} />
  </div>
);

const ProgramNotifications = withLoader(
  React.memo(translate()(_ProgramNotifications))
);
export default ProgramNotifications;
