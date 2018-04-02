import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { RESET_PASSWORD } from "../actions/password-reset-actions.constants";

const resetPasswordReducer = apiReducerFactory({ apiType: RESET_PASSWORD });

export default resetPasswordReducer;
