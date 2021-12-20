import {
  ItemsType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import {
  Currency,
  InternalMultiTransferRequest,
  InternalTransferRequest,
  InternalTransferRequestType
} from "gv-api-web";
import { TFunction } from "i18next";
import {
  getItem,
  getOtherItems
} from "modules/transfer/services/transfer.services";
import {
  TRANSFER_CONTAINER,
  TransferFormItemsType
} from "modules/transfer/transfer.types";
import { NumberFormatValues } from "react-number-format";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

export enum TRANSFER_FORM_FIELDS {
  sourceId = "sourceId",
  sourceType = "sourceType",
  destinationId = "destinationId",
  destinationType = "destinationType",
  amount = "amount",
  transferAll = "transferAll"
}

export const getIdByCurrencyInWalletItem = (
  items: ItemsType,
  currency: CurrencyEnum
): string => {
  return safeGetElemFromArray(items, item => item.currency === currency).id;
};

export const getCurrencyByIdInWalletItem = (
  items: ItemsType,
  id: string
): CurrencyEnum => {
  return safeGetElemFromArray(items, item => item.id === id).currency;
};

export const isAmountAllow = (sourceItems: any[], id: string) => ({
  floatValue,
  formattedValue,
  value
}: NumberFormatValues) => {
  const { currency, available } = getItem(sourceItems, id);
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
  currency: CurrencyEnum;
}) => ({
  validate: (value: number) =>
    value === 0 ? t("validations.greater-zero") : true,
  max: {
    value: +formatCurrencyValue(available, currency),
    message: t("validations.amount-more-than-wallet-balance")
  }
});

export const transferFormMapPropsToValues = ({
  fixedSelects,
  sourceItems,
  destinationItems,
  currentItem,
  currentItemContainer
}: {
  fixedSelects?: boolean;
  sourceItems: ItemsType;
  destinationItems: ItemsType;
  currentItem: WalletItemType;
  currentItemContainer?: TRANSFER_CONTAINER;
}): TransferFormValues => {
  let sourceId, destinationId;
  if (currentItemContainer === TRANSFER_CONTAINER.DESTINATION) {
    destinationId = currentItem.id;
    const sourceItemWithoutCurrent = getOtherItems(sourceItems, destinationId);
    sourceId = sourceItemWithoutCurrent[0].id;
  } else {
    sourceId = currentItem.id;
    const destinationItemWithoutCurrent = getOtherItems(
      destinationItems,
      sourceId
    );
    destinationId = destinationItemWithoutCurrent[0].id;
  }
  if (fixedSelects) {
    const sourceCurrency = getCurrencyByIdInWalletItem(sourceItems, sourceId);
    destinationId = getIdByCurrencyInWalletItem(
      destinationItems,
      sourceCurrency
    );
  }
  return {
    [TRANSFER_FORM_FIELDS.amount]: "",
    sourceId,
    destinationId
  };
};

export const formatWalletItemValue = (item: WalletItemType) =>
  formatCurrencyValue(item.available, item.currency);

export const getTransferFormLoaderData = (
  currentItem: WalletItemType,
  wallets: WalletItemType[]
): TransferFormItemsType => {
  const otherWallet = wallets.filter(
    ({ currency }) => currency !== currentItem.currency
  )[0];
  return {
    destinationItems: [otherWallet, currentItem],
    sourceItems: [otherWallet, currentItem]
  };
};

export interface ITransferFormProps {
  updateWallets?: VoidFunction;
  fixedSelects?: boolean;
  data: TransferFormItemsType;
  onSubmit: (values: InternalMultiTransferRequest) => void;
  currentItem: WalletItemType;
  sourceType: InternalTransferRequestType;
  destinationType: InternalTransferRequestType;
  errorMessage?: string;
  title?: string;
  currentItemContainer?: TRANSFER_CONTAINER;
}

export interface TransferFormValues {
  sourceId: string;
  destinationId: string;
  amount: string | number;
  sourceCurrency?: Currency;
  destinationCurrency?: Currency;
}
