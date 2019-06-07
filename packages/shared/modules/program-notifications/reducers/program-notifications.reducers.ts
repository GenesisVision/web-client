import { ProgramNotificationSettingList } from "gv-api-web";
import { NotificationsActionType } from "shared/utils/types";

import {
  ADD_ERROR_MESSAGE,
  ADD_PROGRAM_NOTIFICATIONS
} from "../actions/program-notifications.actions";

export type ProgramNotificationsState = Readonly<{
  data: { [name: string]: ProgramNotificationSettingList | undefined };
  errorMessage?: string;
}>;

const initialState: ProgramNotificationsState = {
  data: {}
};

const programNotificationsReducer = (
  state: ProgramNotificationsState = initialState,
  action: NotificationsActionType
): ProgramNotificationsState => {
  switch (action.type) {
    case ADD_PROGRAM_NOTIFICATIONS:
      return {
        data: { ...state.data, [action.payload!.url]: action.payload },
        errorMessage: undefined
      };
    case ADD_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default programNotificationsReducer;
