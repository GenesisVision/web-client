import { combineReducers } from "redux";

import forgotPasswordReducer from "./forgot-password-reducer";
import passwordRestoreReducer from "./password-restore-reducer";

const passwordRestoreReducers = combineReducers({
  forgot: forgotPasswordReducer,
  restore: passwordRestoreReducer
});

export default passwordRestoreReducers;
