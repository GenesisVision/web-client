import { alertMessageActionTypes } from "../../actions/alertMessageActions/alertMessageActions"

const initialState = [];

const addMessage = (state, action) => {
  const newMessage = {
    text: action.text,
    className: action.className
  }  
  return [
    ...state,
    newMessage
  ]
}

const removeMessage = (state, action) => {
  return state.filter((v, i) => i !== action.idx);
}

const removeAllMessages = (state) => {
  return [];
}

const alertMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertMessageActionTypes.success:
    case alertMessageActionTypes.warning:
    case alertMessageActionTypes.error:
      return addMessage(state, action);
    case alertMessageActionTypes.removeAt:
      return removeMessage(state, action);
    case alertMessageActionTypes.clearAll:
      return removeAllMessages(state);
    default:
      return state;
  }
}

export default alertMessagesReducer
