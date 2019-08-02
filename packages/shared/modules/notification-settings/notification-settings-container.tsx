import "./notification-settings.scss";

import { NotificationSettingList } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AuthRootState } from "shared/utils/types";

import NotificationSettings from "./notification-settings";
import { notificationSettingsSelector } from "./reducers/notification-settings.reducers";

const _NotificationSettingsContainer: React.FC<Props> = ({ settings }) => (
  <NotificationSettings condition={!!settings} settings={settings!} />
);

const mapStateToProps = (state: AuthRootState): StateProps => ({
  settings: notificationSettingsSelector(state)
});

interface Props extends StateProps, OwnProps {}

interface StateProps {
  settings?: NotificationSettingList;
}

interface OwnProps {}

const NotificationSettingsContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, null, OwnProps, AuthRootState>(mapStateToProps)
)(_NotificationSettingsContainer);
export default NotificationSettingsContainer;
