import defaultReducer from "reducers/reducer-creators/default-reducer";

import { SetProgramIdAction } from "../actions/program-details.actions";
import { SET_PROGRAM_ID } from "../program-details.constants";

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
