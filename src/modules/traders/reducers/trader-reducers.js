import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { TRADER } from "../actions/traders-actions.constants";

const traderReducer = apiReducerFactory({ apiType: TRADER });

export default traderReducer;
