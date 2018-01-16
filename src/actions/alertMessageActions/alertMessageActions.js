const alertMessageActionTypes = {
  success: 'ALERT_MESSAGE_SUCCESS',
  warning: 'ALERT_MESSAGE_WARNING',
  error: 'ALERT_MESSAGE_ERROR',
  removeAt: 'ALERT_MESSAGE_REMOVE_AT',
  clearAll: 'ALERT_MESSAGE_CLEAR_ALL'
}

const success = (text) => ({
  type: alertMessageActionTypes.success,
  className: 'success',
  text
})

const warning = (text) => ({
  type: alertMessageActionTypes.warning,
  className: 'warning',
  text
})

const error = (text) => ({
  type: alertMessageActionTypes.error,
  className: 'danger',
  text
})

const removeAt = (idx) => ({
  type: alertMessageActionTypes.removeAt,
  idx
})

const clearAll = (idx) => ({
  type: alertMessageActionTypes.clearAll
})

const alertMessageActions = { success, warning, error, removeAt, clearAll }

export { alertMessageActions, alertMessageActionTypes }
