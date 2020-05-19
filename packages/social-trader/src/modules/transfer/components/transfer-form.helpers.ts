import {
  ItemsType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import {
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
import { lazy, number, object, Schema } from "yup";

export enum TRANSFER_FORM_FIELDS {
  sourceId = "sourceId",
  sourceType = "sourceType",
  destinationId = "destinationId",
  destinationType = "destinationType",
  amount = "amount",
  transferAll = "transferAll"
}

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

export const transferFormValidationSchema = ({
  sourceItems,
  t
}: {
  t: TFunction;
  sourceItems: ItemsType;
}) => {
  return lazy(
    (values: TransferFormValues): Schema<any> => {
      const { available, currency } = getItem(
        sourceItems,
        values[TRANSFER_FORM_FIELDS.sourceId]
      );
      return object().shape({
        [TRANSFER_FORM_FIELDS.amount]: number()
          .moreThan(0, t("transfer.validation.amount-is-zero"))
          .max(
            +formatCurrencyValue(available, currency),
            t("transfer.validation.amount-more-than-available")
          )
      });
    }
  );
};

export const transferFormMapPropsToValues = ({
  sourceItems,
  destinationItems,
  currentItem,
  currentItemContainer
}: {
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
  data: TransferFormItemsType;
  onSubmit: (values: InternalTransferRequest) => void;
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
}
