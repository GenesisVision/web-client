import authActions from "actions/auth-actions";
import {
  CancelablePromise,
  PasswordModel,
  RecoveryCodesViewModel,
  TwoFactorAuthenticatorConfirm,
  TwoFactorCodeModel,
  TwoFactorCodeWithPassword
} from "gv-api-web";
import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";
import { RootThunk } from "utils/types";

export const confirm2fa = (
  model: TwoFactorAuthenticatorConfirm
): RootThunk<CancelablePromise<RecoveryCodesViewModel>> => (
  dispatch
): CancelablePromise<RecoveryCodesViewModel> => {
  const authorization = authService.getAuthArg();
  return authApi
    .confirmTwoStepAuth(authorization, {
      model
    })
    .then(response => {
      authService.storeToken(response.authToken);
      dispatch(authActions.updateTokenAction(true));
      return response;
    });
};

export const sendPassword = (model: PasswordModel) =>
  authApi.createTwoStepAuthRecoveryCodes(authService.getAuthArg(), { model });

export const disableTFA = (model: TwoFactorCodeWithPassword) =>
  authApi.disableTwoStepAuth(authService.getAuthArg(), { model });

export const fetchTFAData = () =>
  authApi.createTwoStepAuth(authService.getAuthArg());
