import apiReducerFactory from "../../../reducers/api-reducer/api-reducer";

import { LOGIN } from "../actions/login-actions.constants";

const loginReducer = apiReducerFactory({ apiType: LOGIN });

export default loginReducer;
