import { WalletItemType } from "components/wallet-select/wallet-select";
import { FormikProps } from "formik";
import { InternalTransferRequestType } from "gv-api-web";
import {
  getItem,
  getOtherItems
} from "modules/transfer/services/transfer.services";
import {
  TRANSFER_CONTAINER,
  TransferFormItemsType
} from "modules/transfer/transfer.types";
import { WithTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { SetSubmittingType } from "utils/types";
import { lazy, number, object, Schema } from "yup";

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
  data: { sourceItems },
  t
}: ITransferFormProps) => {
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
  destinationType,
  sourceType,
  data: { sourceItems, destinationItems },
  currentItem,
  currentItemContainer
}: ITransferFormOwnProps) => {
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
    [TRANSFER_FORM_FIELDS.sourceId]: sourceId,
    [TRANSFER_FORM_FIELDS.destinationId]: destinationId,
    [TRANSFER_FORM_FIELDS.sourceType]: sourceType,
    [TRANSFER_FORM_FIELDS.destinationType]: destinationType,
    [TRANSFER_FORM_FIELDS.transferAll]: false
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

export enum TRANSFER_FORM_FIELDS {
  sourceId = "sourceId",
  sourceType = "sourceType",
  destinationId = "destinationId",
  destinationType = "destinationType",
  amount = "amount",
  transferAll = "transferAll"
}

export interface ITransferFormOwnProps {
  data: TransferFormItemsType;
  onSubmit: (
    values: TransferFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  currentItem: WalletItemType;
  sourceType: InternalTransferRequestType;
  destinationType: InternalTransferRequestType;
  errorMessage?: string;
  title: string;
  currentItemContainer?: TRANSFER_CONTAINER;
}

export interface TransferFormValues {
  sourceId: string;
  sourceType: InternalTransferRequestType;
  destinationId: string;
  destinationType: InternalTransferRequestType;
  amount?: number;
  transferAll: boolean;
}

export interface ITransferFormProps
  extends WithTranslation,
    FormikProps<TransferFormValues>,
    ITransferFormOwnProps {}
