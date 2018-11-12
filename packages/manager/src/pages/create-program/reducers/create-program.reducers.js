import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { CREATE_PROGRAM } from "../actions/create-program.actions";

const createProgramReducer = apiReducerFactory({
  apiType: CREATE_PROGRAM
});

const programSettingsReducer = combineReducers({
  form: createProgramReducer
});

export default programSettingsReducer;
