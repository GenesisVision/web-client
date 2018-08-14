import { combineReducers } from "redux";

import forgotPasswordReducer from "./forgot-password-reducer";
import resetPasswordReducer from "./reset-password-reducer";
import resetPasswordPendingReducer from "./email-pending-reducer";

const passwordResetReducer = combineReducers({
  forgot: forgotPasswordReducer,
  reset: resetPasswordReducer,
  resetPasswordPending: resetPasswordPendingReducer
});

export default passwordResetReducer;
