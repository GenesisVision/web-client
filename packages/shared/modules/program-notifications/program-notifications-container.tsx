import { ProgramNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import AssetNotifications from "shared/modules/asset-notifications/asset-notifications";
import {
  NOTIFICATIONS,
  NotificationsList
} from "shared/modules/asset-notifications/asset-notifications.types";
import { AuthRootState } from "shared/utils/types";

import {
  addProgramNotification,
  fetchProgramNotifications,
  removeProgramNotification,
  toggleProgramNotification
} from "./services/program-notifications.services";

class ProgramNotificationsContainer extends React.PureComponent<Props> {
  notifications: NotificationsList = {
    general: [
      {
        name: NOTIFICATIONS.ProgramNewsAndUpdates,
        label: this.props.t("notifications-page.program.general.news-updates")
      },
      {
        name: NOTIFICATIONS.ProgramEndOfPeriod,
        label: this.props.t("notifications-page.program.general.end-of-period")
      }
    ],
    custom: true
  };
  componentDidMount() {
    this.props.service.fetchProgramNotifications(this.props.id);
  }

  render() {
    return (
      <AssetNotifications
        condition={!!this.props.program}
        asset={this.props.program!}
        notifications={this.notifications}
        addNotification={addProgramNotification}
        removeNotification={removeProgramNotification}
        toggleNotification={toggleProgramNotification}
      />
    );
  }
}

const mapStateToProps = (
  state: AuthRootState,
  props: OwnProps
): StateProps => ({
  program: state.programNotifications[props.id]
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchProgramNotifications },
    dispatch
  )
});

interface Props extends OwnProps, StateProps, DispatchProps, WithTranslation {}

interface OwnProps {
  id: string;
}

interface StateProps {
  program?: ProgramNotificationSettingList;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchProgramNotifications: typeof fetchProgramNotifications;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramNotificationsContainer);
