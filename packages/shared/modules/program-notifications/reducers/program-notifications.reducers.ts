import { ProgramNotificationSettingList } from "gv-api-web";
import { DeepReadonly } from "utility-types";

import {
  ADD_ERROR_MESSAGE,
  ADD_PROGRAM_NOTIFICATIONS
} from "../actions/program-notifications.actions";

export type ProgramNotificationsState = DeepReadonly<{
  data: { [name: string]: ProgramNotificationSettingList };
  errorMessage?: string;
}>;

const initialState: ProgramNotificationsState = {
  data: {}
};

const programNotificationsReducer = (
  state: ProgramNotificationsState = initialState,
  action: any
): ProgramNotificationsState => {
  switch (action.type) {
    case ADD_PROGRAM_NOTIFICATIONS:
      return {
        data: { ...state.data, [action.settings.url]: action.settings },
        errorMessage: undefined
      };
    case ADD_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage };
    default:
      return state;
  }
};

export default programNotificationsReducer;
