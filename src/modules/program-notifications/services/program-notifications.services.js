import {
  addNotificationSetting,
  removeNotificationSetting
} from "modules/notification-settings/actions/notification-settings.actions";
import {
  addErrorMessage,
  addProgramNotifications,
  fetchProgramNotifications,
  toggleProgramNotifications
} from "modules/program-notifications/actions/program-notifications.actions";

export const fetchProgramNotificationsService = id => dispatch => {
  return dispatch(fetchProgramNotifications(id)).then(data =>
    dispatch(addProgramNotifications(data.value))
  );
};

export const addProgramNotificationService = opts => dispatch => {
  const promise = dispatch(addNotificationSetting(opts));

  promise
    .then(() => dispatch(fetchProgramNotificationsService(opts.programId)))
    .catch(data => dispatch(addErrorMessage(data.errorMessage)));

  return promise;
};

export const removeProgramNotificationService = ({
  id,
  programId
}) => dispatch => {
  return dispatch(removeNotificationSetting(id)).then(() =>
    dispatch(fetchProgramNotificationsService(programId))
  );
};

export const toggleProgramNotificationsService = ({
  id,
  enabled,
  programId
}) => dispatch => {
  return dispatch(toggleProgramNotifications(id, enabled)).then(() =>
    dispatch(fetchProgramNotificationsService(programId))
  );
};
