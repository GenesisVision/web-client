import Yup from "yup";

const editAssetSettingsValidationSchema = ({ t, ...props }) =>
  Yup.object().shape({
    logo: Yup.object().shape({
      width: Yup.number().min(
        300,
        t("create-program-page.settings.validation.image-resolution-incorrect")
      ),
      height: Yup.number().min(
        300,
        t("create-program-page.settings.validation.image-resolution-incorrect")
      ),
      size: Yup.number().max(
        2097152,
        t("create-program-page.settings.validation.image-file-is-large")
      )
    }),
    title: Yup.string()
      .required(t("create-program-page.settings.validation.title-required"))
      .min(4, t("create-program-page.settings.validation.title-is-short"))
      .max(20, t("create-program-page.settings.validation.title-is-long"))
      .matches(
        /^[-a-zA-Z0-9\s]{4,20}$/,
        t("create-program-page.settings.validation.title-is-latin-and-numbers")
      ),
    description: Yup.string()
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
