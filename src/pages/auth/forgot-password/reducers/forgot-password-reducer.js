import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { FORGOT_PASSWORD } from "../actions/forgot-password.actions";

const forgotPasswordReducer = apiReducerFactory({ apiType: FORGOT_PASSWORD });

export default forgotPasswordReducer;
