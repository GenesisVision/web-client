import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { FORGOT_PASSWORD } from "../actions/password-restore-actions.constants";

const forgotPasswordReducer = apiReducerFactory({ apiType: FORGOT_PASSWORD });

export default forgotPasswordReducer;
