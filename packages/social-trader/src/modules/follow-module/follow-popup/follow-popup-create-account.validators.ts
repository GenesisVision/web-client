import { WalletData } from "gv-api-web";
import { TFunction } from "i18next";
import { CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS } from "modules/follow-module/follow-popup/follow-popup-create-external-account";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { lazy, number, object, Schema, string } from "yup";

import { CreateAccountFormValues } from "./follow-popup-create-account";

export enum CREATE_ACCOUNT_FORM_FIELDS {
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount"
}

const getAvailable = (wallet: WalletData, rate: number): number => {
  return convertFromCurrency(wallet ? wallet.available : 0, rate);
};

const CreateAccountFormValidationSchema = ({
  rate,
  minDeposit,
  wallets,
  t
}: {
  rate: number;
  minDeposit: number;
  wallets: WalletData[];
  t: TFunction;
}) => {
  return lazy(
    (values: CreateAccountFormValues): Schema<any> => {
      const wallet = safeGetElemFromArray(
        wallets,
        ({ id }) => id === values.depositWalletId
      );
      const { currency } = wallet;
      const minDepositAmount = convertFromCurrency(minDeposit, rate);
      return object().shape({
        [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: number()
          .required(t("validations.amount-required"))
          .min(
            minDepositAmount,
            t("validations.amount-more-than-min-deposit", {
              value: `${formatCurrencyValue(
                minDepositAmount,
                currency
              )} ${currency}`
            })
          )
          .max(
            getAvailable(wallet, 1),
            t("validations.amount-more-than-account-balance")
          )
      });
    }
  );
};

export const CreateExternalAccountFormValidationSchema = ({
  t
}: {
  t: TFunction;
}) =>
  object<CreateAccountFormValues>().shape({
    [CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.secret]: string().required(
      t("validations.api-secret")
    ),
    [CREATE_EXTERNAL_ACCOUNT_FORM_FIELDS.key]: string().required(
      t("validations.api-key")
    )
  });

export default CreateAccountFormValidationSchema;
