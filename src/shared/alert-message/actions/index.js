import * as alertMessageActionTypes from "./constants";

const success = text => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_SUCCESS,
  className: "success",
  text
});

const warning = text => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_WARNING,
  className: "warning",
  text
});

const error = text => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_ERROR,
  className: "danger",
  text
});

const removeAt = idx => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_REMOVE_AT,
  idx
});

const clearAll = idx => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_CLEAR_ALL
});

const alertMessageActions = { success, warning, error, removeAt, clearAll };

export { alertMessageActions, alertMessageActionTypes };
