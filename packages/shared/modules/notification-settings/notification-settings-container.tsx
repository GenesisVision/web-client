import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import AssetNotificationsGeneral from "shared/modules/asset-notifications/asset-notifications-general";
import { NOTIFICATIONS } from "shared/modules/asset-notifications/asset-notifications.types";
import { AuthRootState } from "shared/utils/types";

import NotificationManagers from "./notification-managers";
import NotificationPrograms from "./notification-programs";
import { NotificationSettingsState } from "./reducers/notification-settings.reducers";
import {
  addNotification,
  fetchNotificationSettings,
  removeNotification
} from "./services/notification-settings.services";

class _NotificationSettingsContainer extends React.PureComponent<Props> {
  notificationsGeneral = [
    {
      name: NOTIFICATIONS.PlatformNewsAndUpdates,
      label: this.props.t("notifications-page.general.news-updates")
    },
    {
      name: NOTIFICATIONS.PlatformEmergency,
      label: this.props.t("notifications-page.general.emergency")
    }
  ];

  componentDidMount() {
    this.props.service.fetchNotificationSettings();
  }

  render() {
    return (
      <div>
        <AssetNotificationsGeneral
          notifications={this.notificationsGeneral}
          settings={this.props.settingsGeneral}
          addNotification={addNotification}
          removeNotification={removeNotification}
        />
        <NotificationPrograms
          condition={this.props.settingsProgram.length > 0}
          settings={this.props.settingsProgram}
        />
        <NotificationManagers
          condition={this.props.settingsManager.length > 0}
          settings={this.props.settingsManager}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  notificationSettings
}: AuthRootState): StateProps => ({
  ...notificationSettings
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchNotificationSettings },
    dispatch
  )
});

interface Props
  extends StateProps,
    DispatchProps,
    OwnProps,
    InjectedTranslateProps {}

interface StateProps extends NotificationSettingsState {}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchNotificationSettings: typeof fetchNotificationSettings;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {}

const NotificationSettingsContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_NotificationSettingsContainer);
export default NotificationSettingsContainer;
