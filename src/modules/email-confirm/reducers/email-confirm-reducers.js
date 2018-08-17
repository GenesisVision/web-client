import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { EMAIL_CONFIRM } from "../actions/email-confirm-actions.constants";

const emailConfirmReducer = apiReducerFactory({ apiType: EMAIL_CONFIRM });

export default emailConfirmReducer;
