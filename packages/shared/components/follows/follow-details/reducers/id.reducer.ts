import defaultReducer from "shared/reducers/reducer-creators/default-reducer";

import {
  SET_PROGRAM_ID,
  SetProgramIdAction
} from "../actions/follow-details.actions";

export type ProgramIdState = string;

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
