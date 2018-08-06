import { FORGOT_PASSWORD_PENDING_ROUTE } from "pages/forgot-password/forgot-password.constants";

import authActions from "../../../actions/auth-actions";
import { HOME_ROUTE } from "../../../pages/root.constants";
import authService from "../../../services/auth-service";
import { alertMessageActions } from "../../../shared/modules/alert-message/actions/alert-message-actions";
import history from "../../../utils/history";
import passwordResetActions from "../actions/password-reset-actions";

const forgotPassword = data => dispatch => {
  return dispatch(passwordResetActions.forgotPassword(data)).then(() => {
    history.push(FORGOT_PASSWORD_PENDING_ROUTE);
  });
};

const resetPassword = (userId, code, data) => dispatch => {
  return dispatch(passwordResetActions.resetPassword(userId, code, data)).then(
    response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      history.push(HOME_ROUTE);
      dispatch(
        alertMessageActions.success("Your password changed successfully!")
      );
    }
  );
};

const passwordResetService = { forgotPassword, resetPassword };
export default passwordResetService;
