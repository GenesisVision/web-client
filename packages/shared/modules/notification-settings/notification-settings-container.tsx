import "./notification-settings.scss";

import { NotificationSettingList } from "gv-api-web";
import * as React from "react";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { AuthRootState } from "shared/utils/types";

import NotificationSettings from "./notification-settings";
import { notificationSettingsSelector } from "./reducers/notification-settings.reducers";
import { fetchNotificationSettings } from "./services/notification-settings.services";

class _NotificationSettingsContainer extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.service.fetchNotificationSettings();
  }

  render() {
    const { settings } = this.props;
    return <NotificationSettings condition={!!settings} settings={settings!} />;
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => ({
  settings: notificationSettingsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchNotificationSettings },
    dispatch
  )
});

interface Props extends StateProps, DispatchProps, OwnProps {}

interface StateProps {
  settings?: NotificationSettingList;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchNotificationSettings: typeof fetchNotificationSettings;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {}

const NotificationSettingsContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_NotificationSettingsContainer);
export default NotificationSettingsContainer;
