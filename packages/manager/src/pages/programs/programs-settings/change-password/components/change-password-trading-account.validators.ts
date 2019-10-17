import i18next from "i18next";
import { object, ref, string } from "yup";

interface IChangePasswordTradingAccountValidationSchema {
  twoFactorEnabled: boolean;
}

const twoFactorValidator = (
  params: i18next.WithT & IChangePasswordTradingAccountValidationSchema
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

const passwordValidator = ({ t }: i18next.WithT) => {
  return string()
    .min(8, t("password-change-trading-account.validators.password-is-short"))
    .max(32, t("password-change-trading-account.validators.password-is-long"))
    .matches(
      /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/,
      t("password-change-trading-account.validators.password-weak")
    )
    .required(
      t("password-change-trading-account.validators.password-required")
    );
};

export const ChangePasswordTradingAccountValidationSchema = (
  params: i18next.WithT & IChangePasswordTradingAccountValidationSchema
) =>
  object().shape({
    twoFactorCode: twoFactorValidator(params),
    password: passwordValidator({ t: params.t }),
    confirmPassword: string()
      .oneOf(
        [ref("password")],
        params.t(
          "password-change-trading-account.validators.password-dont-match"
        )
      )
      .required(
        params.t(
          "password-change-trading-account.validators.confirm-password-required"
        )
      )
  });
