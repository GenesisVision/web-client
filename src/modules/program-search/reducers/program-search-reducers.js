import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import { PROGRAM_SEARCH } from "../actions/program-search-actions.constants";

const programSearchReducer = apiReducerFactory({ apiType: PROGRAM_SEARCH });

export default programSearchReducer;
