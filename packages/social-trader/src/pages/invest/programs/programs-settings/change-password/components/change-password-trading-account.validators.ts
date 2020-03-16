import i18next, { TFunction } from "i18next";
import { twoFactorValidator } from "utils/validators/validators";
import { object, ref, string } from "yup";

interface IChangePasswordTradingAccountValidationSchema {
  twoFactorEnabled: boolean;
}

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

export const ChangePasswordTradingAccountValidationSchema = ({
  t,
  twoFactorEnabled
}: {
  t: TFunction;
  twoFactorEnabled: boolean;
}) =>
  object().shape({
    twoFactorCode: twoFactorValidator(t, twoFactorEnabled),
    password: passwordValidator({ t }),
    confirmPassword: string()
      .oneOf(
        [ref("password")],
        t("password-change-trading-account.validators.password-dont-match")
      )
      .required(
        t(
          "password-change-trading-account.validators.confirm-password-required"
        )
      )
  });
