import {
  addNotificationSetting,
  removeNotificationSetting
} from "modules/notification-settings/actions/notification-settings.actions";
import {
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
  return dispatch(addNotificationSetting(opts)).then(() =>
    dispatch(fetchProgramNotificationsService(opts.programId))
  );
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
