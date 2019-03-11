import { DeepReadonly } from "utility-types";
import * as uuid from "uuid";

import { IAlertAction } from "../actions/alert-message-actions";
import { ALERT_MESSAGE } from "../actions/alert-message-actions.constants";

export type IMessage = DeepReadonly<{
  id: string;
  text: string;
  className?: string;
  isUseLocalization: boolean;
}>;

export type AlertMessagesState = DeepReadonly<IMessage[]>;

const initialState: AlertMessagesState = [];

const addMessage = (
  state: AlertMessagesState,
  action: IAlertAction
): AlertMessagesState => {
  const newMessage = {
    id: uuid.v4(),
    text: action.text,
    className: action.className,
    isUseLocalization: action.isUseLocalization
  };
  return [...state.slice(-2), newMessage];
};

const removeMessage = (
  state: AlertMessagesState,
  action: IAlertAction
): AlertMessagesState => {
  return state.filter(message => message.id !== action.id);
};

const removeAllMessages = (): AlertMessagesState => {
  return [];
};

const alertMessagesReducer = (
  state: AlertMessagesState = initialState,
  action: IAlertAction
): AlertMessagesState => {
  switch (action.type) {
    case ALERT_MESSAGE.SUCCESS:
    case ALERT_MESSAGE.WARNING:
    case ALERT_MESSAGE.ERROR:
      return addMessage(state, action);
    case ALERT_MESSAGE.REMOVE_AT:
      return removeMessage(state, action);
    case ALERT_MESSAGE.CLEAR_ALL:
      return removeAllMessages();
    default:
      return state;
  }
};

export default alertMessagesReducer;
