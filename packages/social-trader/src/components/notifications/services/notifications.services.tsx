import { SkipTake } from "components/notifications/components/notifications.helpers";
import { api } from "services/api-client/swagger-custom-client";

export const fetchNotifications = (options: SkipTake) =>
  api.notifications().getNotifications(options);

export const clearAll = () => api.notifications().readAllNotification();
