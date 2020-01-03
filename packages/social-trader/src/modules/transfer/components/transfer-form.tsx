import "./transfer-form.scss";

import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogField } from "components/dialog/dialog-field";
import { DialogInfo } from "components/dialog/dialog-info";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import InputAmountField from "components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "components/select/select";
import StatisticItem from "components/statistic-item/statistic-item";
import WalletSelect, {
  ItemsType
} from "components/wallet-select/wallet-select";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "decorators/with-blur-loader";
import { withFormik } from "formik";
import { useGetRate } from "hooks/get-rate.hook";
import {
  formatWalletItemValue,
  isAmountAllow,
  ITransferFormOwnProps,
  ITransferFormProps,
  TRANSFER_FORM_FIELDS,
  transferFormMapPropsToValues,
  transferFormValidationSchema,
  TransferFormValues
} from "modules/transfer/components/transfer-form.helpers";
import {
  getItem,
  getOtherItems,
  getTransferAll
} from "modules/transfer/services/transfer.services";
import React, { useCallback, useEffect } from "react";
import { useTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import { TransferFormItemsType } from "../transfer.types";

type InternalTransferRequestSourceTypeEnum = any; //TODO declare type

const _TransferForm: React.FC<ITransferFormProps> = ({
  title,
  sourceType,
  destinationType,
  data: { sourceItems, destinationItems },
  t,
  handleSubmit,
  values,
  isValid,
  dirty,
  errorMessage,
  setFieldValue,
  isSubmitting
}) => {
  const destinationItemsWithoutCurrent = getOtherItems(
    destinationItems,
    values[TRANSFER_FORM_FIELDS.sourceId]
  );
  const selectedDestinationItem = getItem(
    destinationItemsWithoutCurrent,
    values[TRANSFER_FORM_FIELDS.destinationId]
  );
  const selectedSourceItem = getItem(
    sourceItems,
    values[TRANSFER_FORM_FIELDS.sourceId]
  );
  const formattedAvailableSourceItem = formatWalletItemValue(
    selectedSourceItem
  );
  const formattedAvailableDestinationItem = formatWalletItemValue(
    selectedDestinationItem
  );

  const { rate, getRate } = useGetRate();
  useEffect(() => {
    getRate({
      from: selectedDestinationItem.currency,
      to: selectedSourceItem.currency
    });
  }, [selectedDestinationItem.currency, selectedSourceItem.currency]);

  const setMaxAmount = useCallback(() => {
    setFieldValue(TRANSFER_FORM_FIELDS.amount, formattedAvailableSourceItem);
  }, [formattedAvailableSourceItem]);
  const onChangeSourceId = useCallback(
    ({ target: { value } }: ISelectChangeEvent) => {
      const currencyFromNew = value;
      if (currencyFromNew === values[TRANSFER_FORM_FIELDS.destinationId]) {
        setFieldValue(
          TRANSFER_FORM_FIELDS.destinationId,
          values[TRANSFER_FORM_FIELDS.sourceId]
        );
      }
      setFieldValue(TRANSFER_FORM_FIELDS.amount, "");
      setFieldValue(TRANSFER_FORM_FIELDS.sourceId, currencyFromNew);
    },
    [setFieldValue, values]
  );
  const onChangeDestinationId = useCallback(
    ({ target: { value } }: ISelectChangeEvent) =>
      setFieldValue(TRANSFER_FORM_FIELDS.destinationId, value),
    [setFieldValue]
  );

  const disableButton = isSubmitting || !isValid || !dirty;

  return (
    <form
      id="transfer"
      className="transfer-popup"
      onSubmit={handleSubmit}
      noValidate
    >
      <DialogTop title={title}>
        <TransferSelectField
          currency={selectedSourceItem.currency}
          name={TRANSFER_FORM_FIELDS.sourceId}
          value={formattedAvailableSourceItem}
          label={t("transfer.from")}
          onChange={onChangeSourceId}
          items={sourceItems}
          sourceType={sourceType}
        />
      </DialogTop>
      <DialogBottom>
        <TransferSelectField
          currency={selectedDestinationItem.currency}
          name={TRANSFER_FORM_FIELDS.destinationId}
          value={formattedAvailableDestinationItem}
          label={t("transfer.to")}
          onChange={onChangeDestinationId}
          items={destinationItemsWithoutCurrent}
          sourceType={destinationType}
        />
        <DialogField>
          <InputAmountField
            wide
            name={TRANSFER_FORM_FIELDS.amount}
            label={t("transfer.amount")}
            currency={selectedSourceItem.currency}
            setMax={setMaxAmount}
            isAllow={isAmountAllow(
              sourceItems,
              values[TRANSFER_FORM_FIELDS.sourceId]
            )}
          />
        </DialogField>
        {!!values[TRANSFER_FORM_FIELDS.amount] && (
          <span>{`≈ ${formatCurrencyValue(
            Number(values[TRANSFER_FORM_FIELDS.amount]) / rate,
            selectedDestinationItem.currency
          )} ${selectedDestinationItem.currency}`}</span>
        )}
        <DialogError error={errorMessage} />
        <DialogButtons>
          <GVButton
            wide
            type="submit"
            variant="contained"
            color="primary"
            disabled={disableButton}
          >
            {t("buttons.confirm")}
          </GVButton>
        </DialogButtons>
        <DialogInfo>{t("transfer.info")}</DialogInfo>
      </DialogBottom>
    </form>
  );
};

const TransferSelectField: React.FC<{
  name: string;
  label: string;
  items: ItemsType;
  onChange: (e: ISelectChangeEvent) => void;
  sourceType: InternalTransferRequestSourceTypeEnum;
  value: string;
  currency: CurrencyEnum;
}> = React.memo(
  ({ name, label, items, onChange, sourceType, value, currency }) => {
    const [t] = useTranslation();
    return (
      <>
        {items.length > 1 && (
          <DialogField>
            <WalletSelect
              name={name}
              label={label}
              items={items}
              onChange={onChange}
            />
          </DialogField>
        )}
        <DialogField>
          <StatisticItem label={t(`transfer.available${sourceType}From`)} big>
            {`${value} ${currency}`}
          </StatisticItem>
        </DialogField>
      </>
    );
  }
);

const TransferForm = compose<
  React.ComponentType<
    ITransferFormOwnProps & WithBlurLoaderProps<TransferFormItemsType>
  >
>(
  withBlurLoader,
  translate(),
  withFormik<ITransferFormOwnProps, TransferFormValues>({
    enableReinitialize: true,
    displayName: "transfer",
    mapPropsToValues: transferFormMapPropsToValues,
    validationSchema: transferFormValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      const { amount, sourceId } = values;
      const transferAll = getTransferAll(
        { amount: amount!, sourceId },
        props.data.sourceItems
      );
      props.onSubmit({ ...values, transferAll }, setSubmitting);
    }
  }),
  React.memo
)(_TransferForm);
export default TransferForm;
