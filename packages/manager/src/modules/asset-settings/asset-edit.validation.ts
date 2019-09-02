import i18next from "i18next";
import { number, string } from "yup";

export const assetTitleShape = (t: i18next.TFunction) => {
  return string()
    .trim()
    .required(
      t("manager.create-program-page.settings.validation.title-required")
    )
    .min(4, t("manager.create-program-page.settings.validation.title-is-short"))
    .max(20, t("manager.create-program-page.settings.validation.title-is-long"))
    .matches(
      /^[-a-zA-Z0-9\s]{4,20}$/,
      t(
        "manager.create-program-page.settings.validation.title-is-latin-and-numbers"
      )
    );
};

export const assetDescriptionShape = (t: i18next.TFunction) => {
  return string()
    .trim()
    .required(
      t("manager.create-program-page.settings.validation.description-required")
    )
    .min(
      20,
      t("manager.create-program-page.settings.validation.description-is-short")
    )
    .max(
      500,
      t("manager.create-program-page.settings.validation.description-is-long")
    );
};

export const signalSuccessFeeShape = (
  t: i18next.TFunction,
  managerMaxSuccessFee: number
) => {
  return number()
    .min(
      0,
      t("manager.create-program-page.settings.validation.success-fee-min")
    )
    .required(
      t("manager.create-program-page.settings.validation.success-fee-required")
    )
    .max(
      managerMaxSuccessFee,
      t("manager.create-program-page.settings.validation.success-fee-max", {
        max: managerMaxSuccessFee
      })
    );
};

export const signalVolumeFeeShape = (
  t: i18next.TFunction,
  minVolumeFee: number = 0,
  maxVolumeFee: number = 0.1
) => {
  return number()
    .required(
      t(
        "manager.create-program-page.settings.validation.signal-volume-fee-required"
      )
    )
    .min(
      minVolumeFee,
      t(
        "manager.create-program-page.settings.validation.signal-volume-fee-min",
        { min: minVolumeFee.toFixed(2) }
      )
    )
    .max(
      maxVolumeFee,
      t(
        "manager.create-program-page.settings.validation.signal-volume-fee-max",
        { max: maxVolumeFee.toFixed(2) }
      )
    );
};
