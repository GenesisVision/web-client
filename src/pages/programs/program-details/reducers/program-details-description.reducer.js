import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { PROGRAM_DETAILS } from "../actions/program-details-actions";

const programDetailsDescriptionReducer = apiReducerFactory({
  apiType: PROGRAM_DETAILS
});
export default programDetailsDescriptionReducer;
