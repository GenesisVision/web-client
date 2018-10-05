import * as alertMessageActionTypes from "./alert-message-actions.constants";

const withLocalizationAlert = action => ({
  ...action,
  isUseLocalization: true
});

const success = text => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_SUCCESS,
  className: "alert-message--success",
  text
});

const warning = text => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_WARNING,
  className: "alert-message--warning",
  text
});

const error = text => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_ERROR,
  className: "alert-message--danger",
  text
});

const remove = id => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_REMOVE_AT,
  id
});

const clearAll = () => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_CLEAR_ALL
});

const alertMessageActions = {
  success,
  warning,
  error,
  remove,
  clearAll,
  withLocalizationAlert
};

export { alertMessageActions };
