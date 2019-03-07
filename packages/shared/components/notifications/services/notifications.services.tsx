import { NotificationList } from "gv-api-web";
import { Dispatch, MiddlewareAPI } from "redux";
import { ThunkAction, ThunkMiddleware } from "redux-thunk";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import {
  addNotifications,
  addTotalNotifications,
  calculateOptions,
  clearNotifications,
  notificationsFetch,
  setNotificationsOptions
} from "shared/components/notifications/actions/notifications.actions";

import RootState from "../../../reducers/root-reducer";
import { ApiAction } from "../../../utils/types";

export const serviceGetNotifications = (): ThunkAction<
  void,
  RootState,
  any,
  any
> => (dispatch, getState) => {
  const { notifications } = getState();
  const { take, skip } = notifications.options;
  return dispatch(notificationsFetch({ skip, take })).then(response => {
    const options = calculateOptions({ skip, take }, response.total);
    dispatch(addTotalNotifications(response.total));
    dispatch(addNotifications(response.notifications));
    dispatch(setNotificationsOptions(options));
  });
};

export const serviceClearNotifications = () => dispatch => {
  dispatch(clearNotifications());
  dispatch(addTotalNotifications(0));
  dispatch(setNotificationsOptions(calculateOptions()));
  dispatch(fetchProfileHeaderInfo());
};
