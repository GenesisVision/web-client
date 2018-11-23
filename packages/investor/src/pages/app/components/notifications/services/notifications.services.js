import {
  addNotifications,
  addTotalNotifications,
  clearNotifications,
  notificationsFetch,
  setNotificationsOptions
} from "pages/app/components/notifications/actions/notifications.actions";
import { fetchProfileHeaderInfo } from "shared/components/header/services/header-services";

export const TAKE_COUNT = 10;

const calculate = options => {
  if (!options) return { take: TAKE_COUNT, skip: 0 };
  const { total = 0, take = 0, skip = 0 } = options;
  const newSkip = skip + take;
  const newTake = Math.max(Math.min(TAKE_COUNT, total - newSkip), 0);
  return { take: newTake, skip: newSkip };
};

export const serviceGetNotifications = () => (dispatch, getState) => {
  const { notifications } = getState();
  const { take, skip } = notifications.options;
  return dispatch(
    notificationsFetch({
      skip,
      take
    })
  ).then(({ value }) => {
    const options = calculate({ total: value.total, skip, take });
    dispatch(addTotalNotifications(value.total));
    dispatch(addNotifications(value.notifications));
    dispatch(setNotificationsOptions(options));
  });
};

export const serviceClearNotifications = () => dispatch => {
  dispatch(clearNotifications());
  dispatch(addTotalNotifications(0));
  dispatch(setNotificationsOptions(calculate()));
  dispatch(fetchProfileHeaderInfo());
};
