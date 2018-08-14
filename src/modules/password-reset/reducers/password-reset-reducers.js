import { combineReducers } from "redux";

import forgotPasswordReducer from "./forgot-password-reducer";
import resetPasswordReducer from "./reset-password-reducer";

const passwordResetReducer = combineReducers({
  forgot: forgotPasswordReducer,
  reset: resetPasswordReducer
});

export default passwordResetReducer;
