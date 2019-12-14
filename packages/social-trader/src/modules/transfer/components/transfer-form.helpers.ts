import { ItemType } from "components/wallet-select/wallet-select";
import {
  ITransferFormOwnProps,
  ITransferFormProps,
  TRANSFER_FORM_FIELDS,
  TransferFormValues
} from "modules/transfer/components/transfer-form";
import {
  getItem,
  getOtherItems
} from "modules/transfer/services/transfer.services";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import { NumberFormatValues } from "react-number-format";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
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
  sourceItems,
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
  sourceItems,
  destinationItems,
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

export const formatWalletItemValue = (item: ItemType) =>
  formatCurrencyValue(item.available, item.currency);
