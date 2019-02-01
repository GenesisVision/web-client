import { DeepReadonly } from "utility-types";
import uuid from "uuid";

import * as actionTypes from "../actions/alert-message-actions.constants";

export type IMessage = DeepReadonly<{
  id: string;
  text: string;
  className?: string;
  isUseLocalization: boolean;
}>;

export type AlertMessagesState = DeepReadonly<IMessage[]>;

const initialState: AlertMessagesState = [];

const addMessage = (state: AlertMessagesState, action: any) => {
  const newMessage = {
    id: uuid.v4(),
    text: action.text,
    className: action.className,
    isUseLocalization: action.isUseLocalization
  };
  return [...state.slice(-2), newMessage];
};

const removeMessage = (state: AlertMessagesState, action: any) => {
  return state.filter(message => message.id !== action.id);
};

const removeAllMessages = (): AlertMessagesState => {
  return [];
};

const alertMessagesReducer = (
  state: AlertMessagesState = initialState,
  action: any
): AlertMessagesState => {
  switch (action.type) {
    case actionTypes.ALERT_MESSAGE_SUCCESS:
    case actionTypes.ALERT_MESSAGE_WARNING:
    case actionTypes.ALERT_MESSAGE_ERROR:
      return addMessage(state, action);
    case actionTypes.ALERT_MESSAGE_REMOVE_AT:
      return removeMessage(state, action);
    case actionTypes.ALERT_MESSAGE_CLEAR_ALL:
      return removeAllMessages();
    default:
      return state;
  }
};

export default alertMessagesReducer;
