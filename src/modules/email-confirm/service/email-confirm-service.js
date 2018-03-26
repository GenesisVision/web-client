import emailConfirmActions from "../actions/email-confirm-actions";
import history from "../../../utils/history";

import { HOME_ROUTE } from "../../../components/app.constants";

const confirmEmail = (userId, code) => dispath => {
  return dispatch(emailConfirmActions.emailConfirm(userId, code)).then(
    response => {
      authService.storeToken(response.value.data);
      dispatch(authActions.updateToken());
      history.push(HOME_ROUTE);
      dispatch(alertMessage.success("Your email confirmed successfully!"));
    }
  );
};

const emailConfirmService = {};
