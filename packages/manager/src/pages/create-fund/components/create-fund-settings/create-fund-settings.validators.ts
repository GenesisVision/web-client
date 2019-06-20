import inputImageShape from "shared/components/form/input-image/input-image.validation";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { array, lazy, number, object, string } from "yup";

const createFundSettingsValidationSchema = ({ t, ...props }) =>
  lazy(values => {
    const minDepositAmount = convertToCurrency(props.deposit, values.rate);
    return object().shape({
      depositAmount: number()
        .required(
          t("manager.create-program-page.settings.validation.amount-required")
        )
        .min(
          minDepositAmount,
          t("manager.create-program-page.settings.validation.amount-is-zero", {
            min: formatCurrencyValue(
              minDepositAmount,
              values.depositWalletCurrency
            )
          })
        )
        .max(
          props.wallets.find(
            item => item.currency === values.depositWalletCurrency
          ).available,
          t("manager.create-program-page.settings.validation.amount-is-large")
        ),
      logo: inputImageShape(t),
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
        .min(0, "Entry fee must be greater than 0 % ")
        .max(
          props.programsInfo.managerMaxEntryFee,
          "Entry fee must be less than  " +
            props.programsInfo.managerMaxEntryFee +
            " %"
        ),
      exitFee: number()
        .required(
          t("manager.create-fund-page.settings.validation.exit-fee-required")
        )
        .min(0, "Exit fee must be greater than 0 % ")
        .max(
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
    });
  });

export default createFundSettingsValidationSchema;
