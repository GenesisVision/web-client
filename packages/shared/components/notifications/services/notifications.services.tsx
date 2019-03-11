import { NotificationList } from "gv-api-web";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import {
  addNotifications,
  addTotalNotifications,
  calculateOptions,
  clearNotifications,
  setNotificationsOptions
} from "shared/components/notifications/actions/notifications.actions";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";
import { RootThunkAction } from "shared/utils/types";

export const serviceGetNotifications = (): RootThunkAction<
  Promise<NotificationList>
> => (dispatch, getState): Promise<NotificationList> => {
  const { notifications } = getState();
  return notificationsApi
    .v10NotificationsGet(authService.getAuthArg(), notifications.options)
    .then(response => {
      const options = calculateOptions(notifications.options, response.total);
      dispatch(addTotalNotifications(response.total));
      dispatch(addNotifications(response.notifications));
      dispatch(setNotificationsOptions(options));
      return response;
    });
};

export const serviceClearNotifications = (): RootThunkAction => dispatch => {
  dispatch(clearNotifications());
  dispatch(addTotalNotifications(0));
  dispatch(setNotificationsOptions(calculateOptions()));
  dispatch(fetchProfileHeaderInfo());
};
