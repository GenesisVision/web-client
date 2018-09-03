import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { PASSWORD_RESTORE } from "../actions/forgot-password.actions";

const passwordRestoreReducer = apiReducerFactory({ apiType: PASSWORD_RESTORE });

export default passwordRestoreReducer;
