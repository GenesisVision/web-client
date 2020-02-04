import { ProgramNotificationSettingList } from "gv-api-web";
import defaultReducer from "reducers/reducer-creators/default-reducer";

import {
  ADD_PROGRAM_NOTIFICATIONS,
  TAddProgramNotificationsAction
} from "../actions/program-notifications.actions";

export type ProgramNotificationsState = Readonly<{
  [name: string]: ProgramNotificationSettingList | undefined;
}>;

const initialState: ProgramNotificationsState = {};

const programNotificationsReducer = (
  state: ProgramNotificationsState = initialState,
  action: TAddProgramNotificationsAction
): ProgramNotificationsState =>
  defaultReducer<TAddProgramNotificationsAction, ProgramNotificationsState>(
    action,
    state,
    initialState,
    ADD_PROGRAM_NOTIFICATIONS,
    true
  );

export default programNotificationsReducer;
