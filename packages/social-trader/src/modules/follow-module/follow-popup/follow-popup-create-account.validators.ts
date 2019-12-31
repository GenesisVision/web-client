import { WalletData } from "gv-api-web";
import { CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS } from "modules/follow-module/follow-popup/follow-popup-create-external-account";
import {
  convertFromCurrency,
  convertToCurrency
} from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { lazy, number, object, Schema, string } from "yup";

import {
  CreateAccountFormProps,
  CreateAccountFormValues
} from "./follow-popup-create-account";

export enum CREATE_ACCOUNT_FORM_FIELDS {
  depositWalletId = "depositWalletId",
  currency = "currency",
  depositAmount = "depositAmount",
  rate = "rate"
}

const getAvailable = (
  wallets: WalletData[],
  currency: string,
  rate: number
): number => {
  const wallet = wallets.find(
    (wallet: WalletData) => wallet.currency === currency
  );
  return convertToCurrency(wallet ? wallet.available : 0, rate);
};

const CreateAccountFormValidationSchema = ({
  minDeposit,
  wallets,
  t
}: CreateAccountFormProps) => {
  return lazy(
    (values: CreateAccountFormValues): Schema<any> => {
      const rate = values[CREATE_ACCOUNT_FORM_FIELDS.rate];
      const currency = values[CREATE_ACCOUNT_FORM_FIELDS.currency];
      const minDepositAmount = convertFromCurrency(minDeposit, rate);
      return object().shape({
        [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: number()
          .required(
            t("follow-program.create-account.validation.amount-required")
          )
          .min(
            minDepositAmount,
            t(
              "follow-program.create-account.validation.amount-more-than-min-deposit",
              {
                value: `${formatCurrencyValue(
                  minDepositAmount,
                  currency
                )} ${currency}`
              }
            )
          )
          .max(
            getAvailable(
              wallets,
              values[CREATE_ACCOUNT_FORM_FIELDS.currency],
              1
            ),
            t(
              "follow-program.create-account.validation.amount-more-than-available"
            )
          )
      });
    }
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
      t("attach-account-page.settings.validation.api-key")
    )
  });

export default CreateAccountFormValidationSchema;
