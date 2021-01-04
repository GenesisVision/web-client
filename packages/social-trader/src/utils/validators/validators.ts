import { TFunction } from "i18next";
import { number, string } from "yup";

export const minMaxNumberShape = ({
  t,
  min = 0,
  max
}: {
  t: TFunction;
  min?: number;
  max: number;
}) =>
  number()
    .required(t("validations.required"))
    .min(
      min,
      t("validations.min", {
        min
      })
    )
    .max(
      max,
      t("validations.max", {
        max
      })
    );

export const emailValidator = string()
  .email("Invalid email address.")
  .required("Email is required.");

export const passwordValidator = (t: TFunction) =>
  string()
    .min(
      6,
      t("auth:password-restore.validators.password-is-short", {
        count: 6
      })
    )
    .required(t("auth:password-restore.validators.password-required"));

export const ethGvtWalletValidator = string().matches(
  /^0x[a-fA-F0-9]{40}$/,
  "Invalid wallet address"
);

export const btcWalletValidator = string().matches(
  /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
  "Invalid wallet address"
);

export const assetTitleShape = (t: TFunction) => {
  return string()
    .trim()
    .required(t("validations.title-required"))
    .min(4, t("validations.title-is-short"))
    .max(20, t("validations.title-is-long"))
    .matches(
      /^[-a-zA-Z0-9\s]{4,20}$/,
      t("validations.title-is-latin-and-numbers")
    );
};

export const assetDescriptionShape = (t: TFunction) => {
  return string()
    .trim()
    .required(t("validations.description-required"))
    .min(20, t("validations.description-is-short"))
    .max(500, t("validations.description-is-long"));
};

export const signalSuccessFeeShape = (
  t: TFunction,
  min: number,
  max: number
) => {
  return number()
    .min(min, t("validations.success-fee-min"))
    .required(t("validations.success-fee-required"))
    .max(
      max,
      t("validations.success-fee-max", {
        max
      })
    );
};

export const signalVolumeFeeShape = (
  t: TFunction,
  min: number = 0,
  max: number = 0.1
) => {
  return number()
    .required(t("validations.signal-volume-fee-required"))
    .min(
      min,
      t("validations.signal-volume-fee-min", {
        min
      })
    )
    .max(
      max,
      t("validations.signal-volume-fee-max", {
        max
      })
    );
};

export const entryFeeShape = (t: TFunction, max: number) =>
  number()
    .required(t("validations.entry-fee-required"))
    .min(0, t("validations.entry-fee-min"))
    .max(
      max,
      t("validations.entry-fee-max", {
        max
      })
    );

export const successFeeShape = (t: TFunction, max: number) =>
  number()
    .required(t("validations.success-fee-required"))
    .min(0, t("validations.success-fee-min"))
    .max(
      max,
      t("validations.success-fee-max", {
        max
      })
    );

export const exitFeeShape = (t: TFunction, max: number) =>
  number()
    .required(t("validations.exit-fee-required"))
    .min(0, t("validations.exit-fee-min"))
    .max(
      max,
      t("validations.exit-fee-max", {
        max
      })
    );

export const twoFactorRules = (t: TFunction) => ({
  pattern: {
    value: /^\d{6}$/,
    message: t("validations.two-factor-6digits")
  },
  required: t("profile-page:2fa-page.code-required")
});
