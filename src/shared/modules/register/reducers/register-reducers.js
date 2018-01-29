import apiReducerFactory from "../../../reducers/api-reducer/api-reducer";

import { REGISTER } from "../actions/register-actions.constants";

const registerReducer = apiReducerFactory({ apiType: REGISTER });

export default registerReducer;
