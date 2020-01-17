import { WithTranslation } from "react-i18next";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { lazy, number, object, string } from "yup";

import {
  CREATE_ACCOUNT_FIELDS,
  ICreateAccountSettingsFormValues,
  ICreateAccountSettingsProps
} from "./create-account-settings";

const createAccountSettingsValidationSchema = ({
  broker,
  t
}: ICreateAccountSettingsProps & WithTranslation) => {
  return lazy<ICreateAccountSettingsFormValues>(values => {
    const currency = values[CREATE_ACCOUNT_FIELDS.currency];
    const accountType = safeGetElemFromArray(
      broker.accountTypes,
      ({ id }) => values[CREATE_ACCOUNT_FIELDS.brokerAccountTypeId] === id
    );
    const minimumDepositAmount = accountType.minimumDepositsAmount[currency];
    const minDeposit = convertToCurrency(
      minimumDepositAmount,
      values[CREATE_ACCOUNT_FIELDS.rate] || 1
    );
    const minDepositText = parseFloat(
      formatCurrencyValue(minDeposit, currency)
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
      [CREATE_ACCOUNT_FIELDS.depositAmount]:
        currency && accountType.isDepositRequired
          ? number()
              .required(
                t("create-program-page.settings.validation.amount-required")
              )
              .min(
                minDeposit,
                t("create-program-page.settings.validation.amount-is-zero", {
                  min: minDepositText
                })
              )
              .max(
                values[CREATE_ACCOUNT_FIELDS.available],
                t("create-program-page.settings.validation.amount-is-large")
              )
          : number()
    });
  });
};

export default createAccountSettingsValidationSchema;
