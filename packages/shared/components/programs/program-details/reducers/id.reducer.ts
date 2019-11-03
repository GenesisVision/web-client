import defaultReducer from "shared/reducers/reducer-creators/default-reducer";

import {
  // SET_PROGRAM_ID, TODO Fix import
  SetProgramIdAction
} from "../actions/program-details.actions";

export type ProgramIdState = string;
const SET_PROGRAM_ID = "SET_PROGRAM_ID";
const initialState = "";
const programIdReducer = (
  state: ProgramIdState = initialState,
  action: SetProgramIdAction
): string =>
  defaultReducer<SetProgramIdAction, string>(
    action,
    state,
    initialState,
    SET_PROGRAM_ID
  );

export default programIdReducer;
