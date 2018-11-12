import { object, string, number } from "yup";

const createProgramSettingsValidationSchema = ({ t, ...props }) =>
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
        2097152,
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
      ),
    currency: string().required(
      t("create-program-page.settings.validation.currency-required")
    ),
    periodLength: string().required(
      t("create-program-page.settings.validation.period-required")
    ),
    leverage: string().required(
      t("create-program-page.settings.validation.leverage-required")
    ),
    entryFee: number()
      .required(t("create-program-page.settings.validation.entry-fee-required"))
      .max(
        props.programsInfo.managerMaxEntryFee,
        "Entry fee must be less than  " +
          props.programsInfo.managerMaxEntryFee +
          " %"
      ),
    successFee: number()
      .required(
        t("create-program-page.settings.validation.success-fee-required")
      )
      .max(
        props.programsInfo.managerMaxSuccessFee,
        "Success fee must be less than  " +
          props.programsInfo.managerMaxSuccessFee +
          " %"
      ),
    accountType: string().required(
      t("create-program-page.settings.validation.account-type-required")
    )
  });

export default createProgramSettingsValidationSchema;
