import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { PROGRAM_CLOSE } from "../actions/program-close-actions.constants";

const programCloseReducer = apiReducerFactory({ apiType: PROGRAM_CLOSE });
export default programCloseReducer;
