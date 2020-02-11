import * as React from "react";
import { useSelector } from "react-redux";

import NotificationSettings from "./notification-settings";
import { notificationSettingsSelector } from "./reducers/notification-settings.reducers";

const NotificationSettingsContainer: React.FC = () => {
  const settings = useSelector(notificationSettingsSelector);
  return <NotificationSettings condition={!!settings} settings={settings!} />;
};

export default NotificationSettingsContainer;
