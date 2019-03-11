import { InjectedTranslateProps } from "react-i18next";
import { object, ref, string } from "yup";

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
    password: string()
      .matches(
        /^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,32}$/,
        params.t("auth.password-change.validators.password-weak")
      )
      .required(params.t("auth.password-change.validators.password-required")),
    confirmPassword: string()
      .oneOf(
        [ref("password")],
        params.t("auth.password-change.validators.password-dont-match")
      )
      .required(
        params.t("auth.password-change.validators.confirm-password-required")
      )
  });
