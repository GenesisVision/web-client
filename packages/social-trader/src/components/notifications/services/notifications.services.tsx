import { SkipTake } from "components/notifications/components/notifications.helpers";
import notificationsApi from "services/api-client/notifications-api";

export const fetchNotifications = (options: SkipTake) =>
  notificationsApi.getNotifications(options);

export const clearAll = () => notificationsApi.readAllNotification();
