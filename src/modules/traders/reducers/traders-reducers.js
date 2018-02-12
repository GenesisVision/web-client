import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { TRADERS } from "../actions/traders-actions.constants";

const tradersReducer = apiReducerFactory({ apiType: TRADERS });

export default tradersReducer;
