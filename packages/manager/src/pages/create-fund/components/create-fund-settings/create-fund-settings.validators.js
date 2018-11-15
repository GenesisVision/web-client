import { object, string, number, array } from "yup";
import inputPhotoValidation from "shared/components/form/input-photo/input-photo.validators";

const createFundSettingsValidationSchema = ({ t, ...props }) =>
  object().shape({
    logo: inputPhotoValidation(t),
    title: string()
      .required(t("create-fund-page.settings.validation.title-required"))
      .max(20, t("create-fund-page.settings.validation.title-is-long"))
      .matches(
        /^[-a-zA-Z0-9\s]{4,20}$/,
        t("create-fund-page.settings.validation.title-is-latin-and-numbers")
      ),
    description: string()
      .required(t("create-fund-page.settings.validation.description-required"))
      .min(20, t("create-fund-page.settings.validation.description-is-short"))
      .max(500, t("create-fund-page.settings.validation.description-is-long")),
    entryFee: number()
      .required(t("create-fund-page.settings.validation.entry-fee-required"))
      .max(
        props.programsInfo.managerMaxEntryFee,
        "Entry fee must be less than  " +
          props.programsInfo.managerMaxEntryFee +
          " %"
      ),
    exitFee: number()
      .required(t("create-fund-page.settings.validation.exit-fee-required"))
      .max(
        props.programsInfo.managerMaxExitFee,
        "Exit fee must be less than  " +
          props.programsInfo.managerMaxExitFee +
          " %"
      ),
    remainder: number()
      .required(t("create-fund-page.settings.validation.assets-share"))
      .max(0, t("create-fund-page.settings.validation.assets-share")),
    assets: array()
      .required(t("create-fund-page.settings.validation.assets-count"))
      .min(2, t("create-fund-page.settings.validation.assets-count")),
    balance: number()
      .required()
      .min(props.deposit, t("create-fund-page.settings.validation.deposit-min"))
  });

export default createFundSettingsValidationSchema;
