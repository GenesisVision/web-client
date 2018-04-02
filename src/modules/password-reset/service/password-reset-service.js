import { alertMessageActions } from "../../../shared/modules/alert-message/actions/alert-message-actions";
import authActions from "../../../actions/auth-actions";
import authService from "../../../services/auth-service";
import history from "../../../utils/history";
import passwordResetActions from "../actions/password-reset-actions";

import { FORGOT_PASSWORD_PENDING_ROUTE } from "../password-reset.constants";
import { HOME_ROUTE } from "../../../components/app.constants";

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
