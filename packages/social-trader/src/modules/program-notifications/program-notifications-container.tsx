import { ProgramNotificationSettingList } from "gv-api-web";
import AssetNotifications from "modules/asset-notifications/asset-notifications";
import {
  NOTIFICATIONS,
  NotificationsList
} from "modules/asset-notifications/asset-notifications.types";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { AuthRootState } from "utils/types";

import {
  addProgramNotification,
  removeProgramNotification,
  toggleProgramNotification
} from "./services/program-notifications.services";

const ProgramNotificationsContainer: React.FC<Props> = ({ t, program }) => {
  const notifications: NotificationsList = {
    general: [
      {
        name: NOTIFICATIONS.ProgramNewsAndUpdates,
        label: t("notifications-page.program.general.news-updates")
      },
      {
        name: NOTIFICATIONS.ProgramEndOfPeriod,
        label: t("notifications-page.program.general.end-of-period")
      }
    ],
    custom: true
  };
  return (
    <AssetNotifications
      condition={!!program}
      asset={program!}
      notifications={notifications}
      addNotification={addProgramNotification}
      removeNotification={removeProgramNotification}
      toggleNotification={toggleProgramNotification}
    />
  );
};

const mapStateToProps = (
  { programNotifications }: AuthRootState,
  { id }: OwnProps
): StateProps => ({
  program: programNotifications[id]
});

interface Props extends OwnProps, StateProps, WithTranslation {}

interface OwnProps {
  id: string;
}

interface StateProps {
  program?: ProgramNotificationSettingList;
}

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, null, OwnProps, AuthRootState>(mapStateToProps),
  React.memo
)(ProgramNotificationsContainer);
