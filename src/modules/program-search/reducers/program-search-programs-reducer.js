import { PROGRAM_SEARCH } from "../actions/program-search-actions.constants";
import { LOCATION_CHANGE } from "react-router-redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

const programSearchProgramsReducer = apiReducerFactory(
  { apiType: PROGRAM_SEARCH },
  (state, action) => {
    if (action.type === LOCATION_CHANGE) {
      delete state.data;
    }
    return state;
  }
);

export default programSearchProgramsReducer;
