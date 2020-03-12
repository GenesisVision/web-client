import {
  addNotificationsAction,
  SkipTake
} from "components/notifications/actions/notifications.actions";
import { NotificationList } from "gv-api-web";
import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";
import { RootThunk } from "utils/types";

export const serviceGetNotifications = (
  options: SkipTake
): RootThunk<Promise<NotificationList>> => dispatch => {
  return notificationsApi
    .getNotifications(authService.getAuthArg(), options)
    .then(response => {
      dispatch(addNotificationsAction(response.notifications));
      return response;
    });
};

export const clearAll = () =>
  notificationsApi.readAllNotification(authService.getAuthArg());
