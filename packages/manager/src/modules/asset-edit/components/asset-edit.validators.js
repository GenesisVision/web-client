import { object, string, number } from "yup";
import { convertMbToBytes } from "shared/utils/helpers";

const editAssetSettingsValidationSchema = ({ t, ...props }) =>
  object().shape({
    logo: object().shape({
      width: number().min(
        300,
        t("create-program-page.settings.validation.image-resolution-incorrect")
      ),
      height: number().min(
        300,
        t("create-program-page.settings.validation.image-resolution-incorrect")
      ),
      size: number().max(
        convertMbToBytes(2),
        t("create-program-page.settings.validation.image-file-is-large")
      )
    }),
    title: string()
      .required(t("create-program-page.settings.validation.title-required"))
      .min(4, t("create-program-page.settings.validation.title-is-short"))
      .max(20, t("create-program-page.settings.validation.title-is-long"))
      .matches(
        /^[-a-zA-Z0-9\s]{4,20}$/,
        t("create-program-page.settings.validation.title-is-latin-and-numbers")
      ),
    description: string()
      .required(
        t("create-program-page.settings.validation.description-required")
      )
      .min(
        20,
        t("create-program-page.settings.validation.description-is-short")
      )
      .max(
        500,
        t("create-program-page.settings.validation.description-is-long")
      )
  });

export default editAssetSettingsValidationSchema;
