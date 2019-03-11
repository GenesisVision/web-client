import { InjectedTranslateProps } from "react-i18next";
import { object, ref, string } from "yup";
import { passwordValidator } from "shared/utils/validators/validators";

interface IChangePasswordTradingAccountValidationSchema {
  twoFactorEnabled: boolean;
}

const twoFactorvalidator = (
  params: InjectedTranslateProps & IChangePasswordTradingAccountValidationSchema
) => {
  const { t, twoFactorEnabled } = params;
  return twoFactorEnabled
    ? string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"))
        .required(t("wallet-withdraw.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"));
};

export const ChangePasswordTradingAccountValidationSchema = (
  params: InjectedTranslateProps & IChangePasswordTradingAccountValidationSchema
) =>
  object().shape({
    twoFactorCode: twoFactorvalidator(params),
    password: passwordValidator,
    confirmPassword: string()
      .oneOf([ref("password")], params.t("Passwords don't match."))
      .required(params.t("Confirm Password is required"))
  });
