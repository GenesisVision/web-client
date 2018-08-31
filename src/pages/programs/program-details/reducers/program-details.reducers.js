import { combineReducers } from "redux";

import ProgramDetailsDescriptionReducer from "./program-details-description.reducer";

const programDetailsReducer = combineReducers({
  programDetailsDescription: ProgramDetailsDescriptionReducer
});
export default programDetailsReducer;
