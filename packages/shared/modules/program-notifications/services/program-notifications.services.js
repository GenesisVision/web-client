import {
  addNotificationSetting,
  removeNotificationSetting
} from "shared/modules/notification-settings/actions/notification-settings.actions";
import {
  addErrorMessage,
  addProgramNotifications,
  fetchProgramNotifications,
  toggleProgramNotifications
} from "shared/modules/program-notifications/actions/program-notifications.actions";

export const fetchProgramNotificationsService = id => dispatch => {
  return dispatch(fetchProgramNotifications(id)).then(data =>
    dispatch(addProgramNotifications(data.value))
  );
};

export const addProgramNotificationService = opts => dispatch => {
  const promise = dispatch(addNotificationSetting(opts));

  promise
    .then(() => dispatch(fetchProgramNotificationsService(opts.assetId)))
    .catch(data => dispatch(addErrorMessage(data.errorMessage)));

  return promise;
};

export const removeProgramNotificationService = ({
  id,
  assetId
}) => dispatch => {
  return dispatch(removeNotificationSetting(id)).then(() =>
    dispatch(fetchProgramNotificationsService(assetId))
  );
};

export const toggleProgramNotificationsService = ({
  id,
  enabled,
  assetId
}) => dispatch => {
  return dispatch(toggleProgramNotifications(id, enabled)).then(() =>
    dispatch(fetchProgramNotificationsService(assetId))
  );
};
