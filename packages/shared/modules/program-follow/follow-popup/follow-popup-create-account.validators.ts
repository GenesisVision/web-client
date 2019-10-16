import { WalletData } from "gv-api-web";
import {
  convertFromCurrency,
  convertToCurrency
} from "shared/utils/currency-converter";
import { lazy, number, object, Schema } from "yup";

import {
  CREATE_ACCOUNT_FORM_FIELDS,
  CreateAccountFormProps,
  CreateAccountFormValues
} from "./follow-popup-create-account";

const CreateAccountFormValidationSchema = ({
  minDeposit,
  wallets,
  t
}: CreateAccountFormProps) => {
  const getAvailable = (currency: string, rate: number): number => {
    const wallet = wallets.find(
      (wallet: WalletData) => wallet.currency === currency
    );
    return convertToCurrency(wallet ? wallet.available : 0, rate);
  };
  return lazy(
    (values: CreateAccountFormValues): Schema<any> =>
      object().shape({
        [CREATE_ACCOUNT_FORM_FIELDS.initialDepositAmount]: number()
          .required(
            t("follow-program.create-account.validation.amount-required")
          )
          .min(
            convertFromCurrency(
              minDeposit,
              values[CREATE_ACCOUNT_FORM_FIELDS.rate]
            ),
            t(
              "follow-program.create-account.validation.amount-more-than-min-deposit",
              {
                value: convertFromCurrency(
                  minDeposit,
                  values[CREATE_ACCOUNT_FORM_FIELDS.rate]
                )
              }
            )
          )
          .max(
            getAvailable(
              values[CREATE_ACCOUNT_FORM_FIELDS.initialDepositCurrency],
              1
            ),
            t(
              "follow-program.create-account.validation.amount-more-than-available"
            )
          )
      })
  );
};

export default CreateAccountFormValidationSchema;
