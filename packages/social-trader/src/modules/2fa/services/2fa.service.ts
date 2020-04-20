import authActions from "actions/auth-actions";
import {
  PasswordModel,
  RecoveryCodesViewModel,
  TwoFactorAuthenticatorConfirm,
  TwoFactorCodeWithPassword
} from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";
import { RootThunk } from "utils/types";

export const confirm2fa = (
  body: TwoFactorAuthenticatorConfirm
): RootThunk<Promise<RecoveryCodesViewModel>> => (
  dispatch
): Promise<RecoveryCodesViewModel> => {
  return api
    .auth()
    .confirmTwoStepAuth({
      body
    })
    .then(response => {
      authService.storeToken(response.authToken);
      dispatch(authActions.updateTokenAction(true));
      return response;
    });
};

export const sendPassword = (body: PasswordModel) =>
  api.auth().createTwoStepAuthRecoveryCodes({ body });

const getCodeValue = (value?: string): string =>
  value !== undefined ? String(value) : ((value as unknown) as string);

export const disableTFA = ({
  twoFactorCode,
  recoveryCode,
  password
}: TwoFactorCodeWithPassword) =>
  api.auth().disableTwoStepAuth({
    body: {
      twoFactorCode: getCodeValue(twoFactorCode),
      recoveryCode: getCodeValue(recoveryCode),
      password: String(password)
    }
  });

export const fetchTFAData = () => api.auth().createTwoStepAuth();
