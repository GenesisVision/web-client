import { ItemsType } from "components/wallet-select/wallet-select";
import {
  CoinsAsset,
  InternalTransferRequest,
  InternalTransferRequestType
} from "gv-api-web";
import { TFunction } from "i18next";
import { NumberFormatValues } from "react-number-format";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

export enum ASSETS_FORM_FIELDS {
  sourceId = "sourceId",
  sourceType = "sourceType",
  destinationType = "destinationType",
  destinationId = "destinationId",
  amount = "amount",
  transferAll = "transferAll"
}

export const isAmountAllow = (currency: string, available: number) => ({
  floatValue,
  formattedValue,
  value
}: NumberFormatValues) => {
  return (
    formattedValue === "" ||
    (validateFraction(value, currency) && floatValue <= available)
  );
};

export const amountRules = ({
  t,
  available,
  currency
}: {
  t: TFunction;
  available: number;
  currency: string | CurrencyEnum;
}) => ({
  validate: (value: number) =>
    value === 0 ? t("validations.greater-zero") : true,
  max: {
    value: +formatCurrencyValue(available, currency),
    message: t("validations.amount-more-than-wallet-balance")
  }
});

export interface IAssetsTransferFormProps {
  updateWallets?: VoidFunction;
  wallets: ItemsType;
  onSubmit: (values: InternalTransferRequest) => void;
  errorMessage?: string;
  asset: CoinsAsset;
  coinsId: string;
  walletId: string;
  sourceType: InternalTransferRequestType;
  destinationType: InternalTransferRequestType;
  genesisMarketsDiscountPercent: number;
}

export interface AssetsTransferFormValues {
  sourceId: string;
  destinationId: string;
  amount: string | number;
}
