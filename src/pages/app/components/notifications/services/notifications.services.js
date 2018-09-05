import { notificationsFetch } from "pages/app/components/notifications/actions/notifications.actions";

export const serviceGetNotifications = () => dispatch => {
  dispatch(notificationsFetch());
};
