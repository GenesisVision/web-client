import authActions from "../../../actions/auth-actions";
import { HOME_ROUTE } from "../../../pages/root.constants";
import authService from "../../../services/auth-service";
import { alertMessageActions } from "../../../shared/modules/alert-message/actions/alert-message-actions";
import history from "../../../utils/history";
import emailConfirmActions from "../actions/email-confirm-actions";

const confirmEmail = (userId, code) => dispatch => {
  return dispatch(emailConfirmActions.emailConfirm(userId, code)).then(
    response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      history.push(HOME_ROUTE);
      dispatch(
        alertMessageActions.success("Your email confirmed successfully!")
      );
    }
  );
};

const emailConfirmService = { confirmEmail };
export default emailConfirmService;
