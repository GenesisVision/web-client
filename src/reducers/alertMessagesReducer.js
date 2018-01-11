import { ALERT_MESSAGE_SUCCESS, ALERT_MESSAGE_ERROR, ALERT_MESSAGE_CLEAR, ALERT_MESSAGE_CLEAR_ALL, ALERT_MESSAGE_WARNING } from "../actions/alertMessageActions";

const initialState = [];

const addMessageReducer = (state, action) => {
  const newMessage = {
    text: action.text,
  }
  switch (action.type) {
    case ALERT_MESSAGE_SUCCESS:
      newMessage.className = 'success';
      break;
    case ALERT_MESSAGE_WARNING:
      newMessage.className = 'warning';
      break;
    case ALERT_MESSAGE_ERROR:
      newMessage.className = 'danger';
      break;
    default: break;
  }
  return [
    ...state,
    newMessage
  ]
}

const removeMessage = (state, messageIdx) => {
  return state.filter((v, i) => i !== messageIdx);
}

const removeAllMessages = (state) => {
  return [];
}

const alertMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_MESSAGE_SUCCESS:
    case ALERT_MESSAGE_WARNING:
    case ALERT_MESSAGE_ERROR:
      return addMessageReducer(state, action);
    case ALERT_MESSAGE_CLEAR:
      return removeMessage(state, action.idx);
    case ALERT_MESSAGE_CLEAR_ALL:
      return removeAllMessages(state);
    default:
      return state;
  }
}

export default alertMessagesReducer
