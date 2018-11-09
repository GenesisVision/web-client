import uuid from "uuid";

import * as actionTypes from "../actions/alert-message-actions.constants";

const initialState = [];

const addMessage = (state, action) => {
  const newMessage = {
    id: uuid.v4(),
    text: action.text,
    className: action.className,
    isUseLocalization: action.isUseLocalization
  };
  return [...state.slice(-2), newMessage];
};

const removeMessage = (state, action) => {
  return state.filter(message => message.id !== action.id);
};

const removeAllMessages = state => {
  return [];
};

const alertMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALERT_MESSAGE_SUCCESS:
    case actionTypes.ALERT_MESSAGE_WARNING:
    case actionTypes.ALERT_MESSAGE_ERROR:
      return addMessage(state, action);
    case actionTypes.ALERT_MESSAGE_REMOVE_AT:
      return removeMessage(state, action);
    case actionTypes.ALERT_MESSAGE_CLEAR_ALL:
      return removeAllMessages(state);
    default:
      return state;
  }
};

export default alertMessagesReducer;
