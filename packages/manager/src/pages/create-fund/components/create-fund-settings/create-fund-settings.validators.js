import { array, number, object, string, lazy } from "yup";

const createFundSettingsValidationSchema = ({ t, ...props }) =>
  lazy(values =>
    object().shape({
      depositAmount: number()
        .required(
          t("manager.create-program-page.settings.validation.amount-required")
        )
        .moreThan(
          50,
          t("manager.create-program-page.settings.validation.amount-is-zero")
        )
        .max(
          props.wallets.find(
            item => item.currency === values.depositWalletCurrency
          ).available,
          t("manager.create-program-page.settings.validation.amount-is-large")
        ),
      logo: object().shape({
        width: number().min(
          300,
          t(
            "manager.create-fund-page.settings.validation.image-resolution-incorrect"
          )
        ),
        height: number().min(
          300,
          t(
            "manager.create-fund-page.settings.validation.image-resolution-incorrect"
          )
        ),
        size: number().max(
          2097152,
          t("manager.create-fund-page.settings.validation.image-file-is-large")
        )
      }),
      title: string()
        .required(
          t("manager.create-fund-page.settings.validation.title-required")
        )
        .min(
          4,
          t("manager.create-fund-page.settings.validation.title-is-short")
        )
        .max(
          20,
          t("manager.create-fund-page.settings.validation.title-is-long")
        )
        .matches(
          /^[-a-zA-Z0-9\s]{4,20}$/,
          t(
            "manager.create-fund-page.settings.validation.title-is-latin-and-numbers"
          )
        ),
      description: string()
        .required(
          t("manager.create-fund-page.settings.validation.description-required")
        )
        .min(
          20,
          t("manager.create-fund-page.settings.validation.description-is-short")
        )
        .max(
          500,
          t("manager.create-fund-page.settings.validation.description-is-long")
        ),
      entryFee: number()
        .required(
          t("manager.create-fund-page.settings.validation.entry-fee-required")
        )
        .moreThan(0.01, "Entry fee must be greater than 0.01 % ")
        .lessThan(
          props.programsInfo.managerMaxEntryFee,
          "Entry fee must be less than  " +
            props.programsInfo.managerMaxEntryFee +
            " %"
        ),
      exitFee: number()
        .required(
          t("manager.create-fund-page.settings.validation.exit-fee-required")
        )
        .moreThan(0.01, "Exit fee must be greater than 0.01 % ")
        .lessThan(
          props.programsInfo.managerMaxExitFee,
          "Exit fee must be less than  " +
            props.programsInfo.managerMaxExitFee +
            " %"
        ),
      remainder: number()
        .required(
          t("manager.create-fund-page.settings.validation.assets-share")
        )
        .max(0, t("manager.create-fund-page.settings.validation.assets-share")),
      assets: array()
        .required(
          t("manager.create-fund-page.settings.validation.assets-count")
        )
        .min(2, t("manager.create-fund-page.settings.validation.assets-count"))
    })
  );

export default createFundSettingsValidationSchema;
