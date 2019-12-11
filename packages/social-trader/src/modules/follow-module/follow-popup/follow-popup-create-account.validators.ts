import { WalletData } from "gv-api-web";
import { CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS } from "modules/follow-module/follow-popup/follow-popup-create-external-account";
import {
  convertFromCurrency,
  convertToCurrency
} from "shared/utils/currency-converter";
import { lazy, number, object, Schema, string } from "yup";

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
        [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: number()
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
            getAvailable(values[CREATE_ACCOUNT_FORM_FIELDS.currency], 1),
            t(
              "follow-program.create-account.validation.amount-more-than-available"
            )
          )
      })
  );
};

export const CreateExternalAccountFormValidationSchema = ({
  t
}: CreateAccountFormProps) =>
  object<CreateAccountFormValues>().shape({
    [CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.secret]: string().required(
      t("attach-account-page.settings.validation.api-secret")
    ),
    [CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.key]: string().required(
      t("attach-account-page.settings.validation.api-secret")
    )
  });

export default CreateAccountFormValidationSchema;
