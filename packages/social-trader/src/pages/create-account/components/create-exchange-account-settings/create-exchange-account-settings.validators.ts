import { ExchangeInfo } from "gv-api-web";
import { TFunction } from "i18next";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum } from "utils/types";
import { lazy, number, object, Schema } from "yup";

import {
  CREATE_EXCHANGE_ACCOUNT_FIELDS,
  ICreateExchangeAccountSettingsFormValues
} from "./create-exchange-account-settings";

const CreateExchangeAccountSettingsValidationSchema = ({
  currency,
  rate,
  available,
  exchange,
  t
}: {
  currency: CurrencyEnum;
  rate: number;
  available: number;
  t: TFunction;
  exchange: ExchangeInfo;
}) => {
  return lazy<ICreateExchangeAccountSettingsFormValues>(values => {
    const accountType = safeGetElemFromArray(
      exchange.accountTypes,
      ({ id }) =>
        values[CREATE_EXCHANGE_ACCOUNT_FIELDS.brokerAccountTypeId] === id
    );
    const minimumDepositAmount = accountType.minimumDepositsAmount[currency];
    const minDeposit = convertToCurrency(minimumDepositAmount, rate);
    const minDepositText = parseFloat(
      formatCurrencyValue(minDeposit, currency)
    );
    return object<ICreateExchangeAccountSettingsFormValues>().shape({
      [CREATE_EXCHANGE_ACCOUNT_FIELDS.depositAmount]: number()
        .required(t("validations.amount-required"))
        .min(
          minDeposit,
          t("validations.amount-is-zero", {
            min: minDepositText
          })
        )
        .max(available, t("validations.amount-is-large"))
    }) as Schema<ICreateExchangeAccountSettingsFormValues>;
  });
};

export default CreateExchangeAccountSettingsValidationSchema;
