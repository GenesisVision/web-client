import useApiRequest from "hooks/api-request.hook";
import { fetchNotificationSettings } from "modules/notification-settings/services/notification-settings.services";
import * as React from "react";
import { useCallback } from "react";

import NotificationSettings from "./notification-settings";

const NotificationSettingsContainer: React.FC = () => {
  const { data: settings, sendRequest } = useApiRequest({
    name: "settings",
    cache: true,
    request: fetchNotificationSettings,
    fetchOnMount: true
  });
  const handleSuccess = useCallback(() => {
    return sendRequest();
  }, [sendRequest]);
  return (
    <NotificationSettings
      onSuccess={handleSuccess}
      condition={!!settings}
      settings={settings!}
    />
  );
};

export default NotificationSettingsContainer;
