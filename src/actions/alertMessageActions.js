export const ALERT_MESSAGE_SUCCESS = 'ALERT_MESSAGE_SUCCESS'
export const ALERT_MESSAGE_WARNING = 'ALERT_MESSAGE_WARNING'
export const ALERT_MESSAGE_ERROR = 'ALERT_MESSAGE_ERROR'
export const ALERT_MESSAGE_CLEAR = 'ALERT_MESSAGE_CLEAR'
export const ALERT_MESSAGE_CLEAR_ALL = 'ALERT_MESSAGE_CLEAR_ALL'

const success = (text) => ({
  type: ALERT_MESSAGE_SUCCESS,
  text
})

const warning = (text) => ({
  type: ALERT_MESSAGE_WARNING,
  text
})

const error = (text) => ({
  type: ALERT_MESSAGE_ERROR,
  text
})

const clearMessage = (idx) => ({
  type: ALERT_MESSAGE_CLEAR,
  idx
})

const clearAll = (idx) => ({
  type: ALERT_MESSAGE_CLEAR_ALL
})

const alertMessageActions = { success, warning, error, clearMessage, clearAll }

export default alertMessageActions;
