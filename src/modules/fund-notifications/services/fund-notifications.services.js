import {
  addNotificationSetting,
  removeNotificationSetting
} from "modules/notification-settings/actions/notification-settings.actions";
import {
  addFundNotifications,
  fetchFundNotifications,
  toggleFundNotifications
} from "modules/fund-notifications/actions/fund-notifications.actions";

export const fetchFundNotificationsService = id => dispatch => {
  return dispatch(fetchFundNotifications(id)).then(data =>
    dispatch(addFundNotifications(data.value))
  );
};

export const addFundNotificationsService = opts => dispatch => {
  return dispatch(addNotificationSetting(opts)).then(() =>
    dispatch(fetchFundNotificationsService(opts.fundId))
  );
};

export const removeFundNotificationService = ({ id, fundId }) => dispatch => {
  return dispatch(removeNotificationSetting(id)).then(() =>
    dispatch(fetchFundNotificationsService(fundId))
  );
};

export const toggleFundNotificationsService = ({
  id,
  enabled,
  fundId
}) => dispatch => {
  return dispatch(toggleFundNotifications(id, enabled)).then(() =>
    dispatch(fetchFundNotificationsService(fundId))
  );
};
