import * as Yup from "yup";

const createFundSettingsValidationSchema = ({ t, ...props }) =>
  Yup.object().shape({
    logo: Yup.object().shape({
      width: Yup.number().min(
        300,
        t("create-fund-page.settings.validation.image-resolution-incorrect")
      ),
      height: Yup.number().min(
        300,
        t("create-fund-page.settings.validation.image-resolution-incorrect")
      ),
      size: Yup.number().max(
        2097152,
        t("create-fund-page.settings.validation.image-file-is-large")
      )
    }),
    title: Yup.string()
      .required(t("create-fund-page.settings.validation.title-required"))
      .max(20, t("create-fund-page.settings.validation.title-is-long")),
    description: Yup.string()
      .required(t("create-fund-page.settings.validation.description-required"))
      .min(20, t("create-fund-page.settings.validation.description-is-short"))
      .max(500, t("create-fund-page.settings.validation.description-is-long")),
    entryFee: Yup.number()
      .required(t("create-fund-page.settings.validation.entry-fee-required"))
      .max(
        props.programsInfo.managerMaxEntryFee,
        "Entry fee must be less than  " +
          props.programsInfo.managerMaxEntryFee +
          " %"
      ),
    exitFee: Yup.number()
      .required(t("create-fund-page.settings.validation.exit-fee-required"))
      .max(
        props.programsInfo.managerMaxExitFee,
        "Exit fee must be less than  " +
          props.programsInfo.managerMaxExitFee +
          " %"
      ),
    remainder: Yup.number()
      .required(t("create-fund-page.settings.validation.assets-share"))
      .max(0, t("create-fund-page.settings.validation.assets-share")),
    assets: Yup.array()
      .required(t("create-fund-page.settings.validation.assets-count"))
      .min(2, t("create-fund-page.settings.validation.assets-count")),
    balance: Yup.number()
      .required()
      .min(props.deposit, t("create-fund-page.settings.validation.deposit-min"))
  });

export default createFundSettingsValidationSchema;
