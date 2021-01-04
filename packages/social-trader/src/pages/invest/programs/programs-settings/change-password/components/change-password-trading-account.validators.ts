import { TFunction, WithT } from "i18next";
import { object, ref, string } from "yup";

interface IChangePasswordTradingAccountValidationSchema {
  twoFactorEnabled: boolean;
}

const passwordValidator = ({ t }: WithT) => {
  return string()
    .min(
      8,
      t(
        "asset-settings:password-change-trading-account.validators.password-is-short"
      )
    )
    .max(
      32,
      t(
        "asset-settings:password-change-trading-account.validators.password-is-long"
      )
    )
    .matches(
      /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/,
      t(
        "asset-settings:password-change-trading-account.validators.password-weak"
      )
    )
    .required(
      t(
        "asset-settings:password-change-trading-account.validators.password-required"
      )
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
    password: passwordValidator({ t }),
    confirmPassword: string()
      .oneOf(
        [ref("password")],
        t(
          "asset-settings:password-change-trading-account.validators.password-dont-match"
        )
      )
      .required(
        t(
          "asset-settings:password-change-trading-account.validators.confirm-password-required"
        )
      )
  });
