import { WithTranslation } from "react-i18next";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { lazy, number, object, string } from "yup";

import {
  CREATE_ACCOUNT_FIELDS,
  ICreateAccountSettingsFormValues,
  ICreateAccountSettingsProps
} from "./create-account-settings";

const createAccountSettingsValidationSchema = ({
  t,
  minimumDepositsAmount
}: ICreateAccountSettingsProps & WithTranslation) => {
  return lazy<ICreateAccountSettingsFormValues>(values => {
    const minDeposit = parseFloat(
      formatCurrencyValue(
        convertToCurrency(
          minimumDepositsAmount[values[CREATE_ACCOUNT_FIELDS.currency]],
          values[CREATE_ACCOUNT_FIELDS.rate] || 1
        ),
        values[CREATE_ACCOUNT_FIELDS.currency]
      )
    );
    return object<ICreateAccountSettingsFormValues>().shape({
      [CREATE_ACCOUNT_FIELDS.currency]: string().required(
        t("create-program-page.settings.validation.currency-required")
      ),
      [CREATE_ACCOUNT_FIELDS.leverage]: number().required(
        t("create-program-page.settings.validation.leverage-required")
      ),
      [CREATE_ACCOUNT_FIELDS.brokerAccountTypeId]: string().required(
        t("create-program-page.settings.validation.account-type-required")
      ),
      [CREATE_ACCOUNT_FIELDS.depositAmount]: values[
        CREATE_ACCOUNT_FIELDS.currency
      ]
        ? number()
            .required(
              t("create-program-page.settings.validation.amount-required")
            )
            .min(
              minDeposit,
              t("create-program-page.settings.validation.amount-is-zero", {
                min: minDeposit
              })
            )
            .max(
              values[CREATE_ACCOUNT_FIELDS.available],
              t("create-program-page.settings.validation.amount-is-large")
            )
        : number().required(
            t("create-program-page.settings.validation.amount-required")
          )
    });
  });
};

export default createAccountSettingsValidationSchema;
