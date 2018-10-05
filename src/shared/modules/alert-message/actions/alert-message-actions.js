import * as alertMessageActionTypes from "./alert-message-actions.constants";

const success = (text, isUseLocalization = false) => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_SUCCESS,
  className: "alert-message--success",
  text,
  isUseLocalization
});

const warning = (text, isUseLocalization = false) => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_WARNING,
  className: "alert-message--warning",
  text,
  isUseLocalization
});

const error = (text, isUseLocalization = false) => ({
  type: alertMessageActionTypes.ALERT_MESSAGE_ERROR,
  className: "alert-message--danger",
  text,
  isUseLocalization
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
  clearAll
};

export { alertMessageActions };
