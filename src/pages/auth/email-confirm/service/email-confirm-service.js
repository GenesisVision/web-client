import authActions from "actions/auth-actions";
import { HOME_ROUTE } from "pages/root.constants";
import { push } from "react-router-redux";
import authService from "services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import emailConfirmActions from "../actions/email-confirm-actions";

const confirmEmail = (userId, code) => dispatch => {
  return dispatch(emailConfirmActions.emailConfirm(userId, code)).then(
    response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(push(HOME_ROUTE));
      dispatch(
        alertMessageActions.success("Your email confirmed successfully!")
      );
    }
  );
};

const emailConfirmService = { confirmEmail };
export default emailConfirmService;
