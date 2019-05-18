import { ProgramNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import withLoader from "shared/decorators/with-loader";
import AssetNotificationsGeneral from "shared/modules/asset-notifications/asset-notifications-general";
import ProgramNotificationsCustom from "shared/modules/program-notifications/program-notifications-custom";

import {
  addProgramNotification,
  removeProgramNotification
} from "./services/program-notifications.services";

class _ProgramNotifications extends React.PureComponent<Props> {
  notifications = [
    {
      name: NOTIFICATIONS.ProgramNewsAndUpdates,
      label: this.props.t("notifications-page.program.general.news-updates")
    },
    {
      name: NOTIFICATIONS.ProgramEndOfPeriod,
      label: this.props.t("notifications-page.program.general.end-of-period")
    }
  ];

  render() {
    const { program } = this.props;
    return (
      <div>
        <h3 className="notification-settings__title">{program.title}</h3>
        <AssetNotificationsGeneral
          notifications={this.notifications}
          settings={program.settingsGeneral}
          assetId={program.assetId}
          addNotification={addProgramNotification}
          removeNotification={removeProgramNotification}
        />
        <ProgramNotificationsCustom program={program} />
      </div>
    );
  }
}

interface Props extends InjectedTranslateProps {
  program: ProgramNotificationSettingList;
}

enum NOTIFICATIONS {
  ProgramNewsAndUpdates = "ProgramNewsAndUpdates",
  ProgramEndOfPeriod = "ProgramEndOfPeriod"
}

const ProgramNotifications = withLoader(translate()(_ProgramNotifications));
export default ProgramNotifications;
