import authActions from "actions/auth-actions";
import { HOME_ROUTE } from "pages/app/app.routes";
import { push } from "react-router-redux";
import { authApiProxy } from "services/api-client/auth-api";
import authService from "services/auth-service";

const confirmEmail = (userId, code) => dispatch => {
  return authApiProxy
    .authApiProxy({
      userId,
      code
    })
    .then(response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(push(HOME_ROUTE));
      // dispatch(
      //   alertMessageActions.success("Your email confirmed successfully!")
      // );
    });
};

const emailConfirmService = { confirmEmail };
export default emailConfirmService;
