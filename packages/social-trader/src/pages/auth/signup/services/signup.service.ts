import { RegisterViewModel } from "gv-api-web";
import authApi from "services/api-client/auth-api";

export const signUp: SingUpFuncType = ({
  utmSource,
  userName,
  email,
  password,
  confirmPassword,
  refCode,
  isAuto,
  captchaCheckResult
}) =>
  authApi
    .register({
      body: {
        utmSource,
        userName,
        email,
        password,
        confirmPassword,
        refCode,
        isAuto,
        captchaCheckResult
      }
    })
    .then(() => email);

export type SingUpFuncType = (props: RegisterViewModel) => Promise<any>;
