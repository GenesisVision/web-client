import { SkipTake } from "components/notifications/components/notifications.helpers";
import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";

export const fetchNotifications = (options: SkipTake) =>
  notificationsApi.getNotifications(authService.getAuthArg(), options);

export const clearAll = () =>
  notificationsApi.readAllNotification(authService.getAuthArg());
