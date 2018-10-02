import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import {
  addNotifications,
  notificationsFetch,
  setNotificationsOptions
} from "pages/app/components/notifications/actions/notifications.actions";

export const TAKE_COUNT = 10;

const calculate = ({ total, take, skip }) => {
  const newSkip = skip + take;
  const newTake = Math.max(Math.min(TAKE_COUNT, total - newSkip), 0);
  return { take: newTake, skip: newSkip };
};

export const serviceGetNotifications = () => (dispatch, getState) => {
  const { notifications } = getState();
  const { take, skip } = notifications.options;
  dispatch(
    notificationsFetch({
      skip,
      take
    })
  ).then(({ value }) => {
    const options = calculate({ total: value.total, skip, take });
    dispatch(addNotifications(value.notifications));
    dispatch(setNotificationsOptions(options));
    dispatch(fetchProfileHeaderInfo());
  });
};
