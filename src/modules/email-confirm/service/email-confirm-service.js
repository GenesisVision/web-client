import { alertMessageActions } from "../../../shared/modules/alert-message/actions/alert-message-actions";
import authActions from "../../../actions/auth-actions";
import authService from "../../../services/auth-service";
import emailConfirmActions from "../actions/email-confirm-actions";
import history from "../../../utils/history";

import { HOME_ROUTE } from "../../../components/app.constants";

const confirmEmail = (userId, code) => dispatch => {
  return dispatch(emailConfirmActions.emailConfirm(userId, code)).then(
    response => {
      authService.storeToken(response.value.data);
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
