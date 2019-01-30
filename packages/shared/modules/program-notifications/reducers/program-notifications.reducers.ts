import { ProgramNotificationSettingList } from "gv-api-web";

import {
  ADD_ERROR_MESSAGE,
  ADD_PROGRAM_NOTIFICATIONS
} from "../actions/program-notifications.actions";

export interface IProgramNotificationsStore {
  data: { [name: string]: ProgramNotificationSettingList };
  errorMessage?: string;
}

const initialState: IProgramNotificationsStore = {
  data: {}
};

const programNotificationsReducer = (
  state: IProgramNotificationsStore = initialState,
  action
): IProgramNotificationsStore => {
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
