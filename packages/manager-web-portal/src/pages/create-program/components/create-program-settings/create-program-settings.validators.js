import Yup from "yup";

const createProgramSettingsValidationSchema = ({ t, ...props }) =>
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
      ),
    currency: Yup.string().required(
      t("create-program-page.settings.validation.currency-required")
    ),
    periodLength: Yup.string().required(
      t("create-program-page.settings.validation.period-required")
    ),
    leverage: Yup.string().required(
      t("create-program-page.settings.validation.leverage-required")
    ),
    entryFee: Yup.number()
      .required(t("create-program-page.settings.validation.entry-fee-required"))
      .max(
        props.programsInfo.managerMaxEntryFee,
        "Entry fee must be less than  " +
          props.programsInfo.managerMaxEntryFee +
          " %"
      ),
    successFee: Yup.number()
      .required(
        t("create-program-page.settings.validation.success-fee-required")
      )
      .max(
        props.programsInfo.managerMaxSuccessFee,
        "Success fee must be less than  " +
          props.programsInfo.managerMaxSuccessFee +
          " %"
      ),
    accountType: Yup.string().required(
      t("create-program-page.settings.validation.account-type-required")
    )
  });

export default createProgramSettingsValidationSchema;
