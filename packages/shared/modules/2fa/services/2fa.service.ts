import {
  CancelablePromise,
  PasswordModel,
  RecoveryCodesViewModel,
  TwoFactorAuthenticatorConfirm
} from "gv-api-web";
import authActions from "shared/actions/auth-actions";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import { RootThunk } from "shared/utils/types";

export const confirm2fa = (
  model: TwoFactorAuthenticatorConfirm
): RootThunk<CancelablePromise<RecoveryCodesViewModel>> => (
  dispatch
): CancelablePromise<RecoveryCodesViewModel> => {
  const authorization = authService.getAuthArg();
  return authApi
    .v10Auth2faConfirmPost(authorization, {
      model
    })
    .then(response => {
      authService.storeToken(response.authToken);
      dispatch(authActions.updateTokenAction());
      return response;
    });
};

export const sendPassword = (model: PasswordModel) =>
  authApi.v10Auth2faRecoverycodesNewPost(authService.getAuthArg(), { model });
