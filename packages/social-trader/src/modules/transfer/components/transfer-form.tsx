import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogInfo } from "components/dialog/dialog-info";
import { DialogTop } from "components/dialog/dialog-top";
import FormError from "components/form/form-error/form-error";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { useGetRate } from "hooks/get-rate.hook";
import {
  amountRules,
  formatWalletItemValue,
  getCurrencyByIdInWalletItem,
  getIdByCurrencyInWalletItem,
  isAmountAllow,
  ITransferFormProps,
  TRANSFER_FORM_FIELDS,
  transferFormMapPropsToValues,
  TransferFormValues
} from "modules/transfer/components/transfer-form.helpers";
import { TransferSelectField } from "modules/transfer/components/transfer-form-select-field";
import {
  getItem,
  getOtherItems,
  getTransferAll
} from "modules/transfer/services/transfer.services";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { HookForm } from "utils/hook-form.helpers";

import styles from "./transfer-form.module.scss";

const _TransferForm: React.FC<ITransferFormProps> = ({
  updateWallets,
  fixedSelects,
  currentItem,
  currentItemContainer,
  onSubmit,
  title,
  sourceType,
  destinationType,
  data: { sourceItems, destinationItems },
  errorMessage
}) => {
  const [t] = useTranslation();

  const form = useForm<TransferFormValues>({
    defaultValues: transferFormMapPropsToValues({
      fixedSelects,
      sourceItems,
      destinationItems,
      currentItem,
      currentItemContainer
    }),
    mode: "onChange"
  });
  const { reset, watch, setValue } = form;
  const { sourceId, destinationId, amount } = watch();

  const destinationItemsWithoutCurrent = getOtherItems(
    destinationItems,
    sourceId
  );
  const selectedDestinationItem = getItem(
    destinationItemsWithoutCurrent,
    destinationId
  );
  const selectedSourceItem = getItem(sourceItems, sourceId);

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

  const setMax = useCallback(() => {
    setValue(TRANSFER_FORM_FIELDS.amount, +formattedAvailableSourceItem, true);
  }, [formattedAvailableSourceItem]);

  const onChangeSourceId = useCallback(
    ({ id }: WalletItemType) => {
      if (fixedSelects) {
        const sourceCurrency = getCurrencyByIdInWalletItem(sourceItems, id);
        const destinationId = getIdByCurrencyInWalletItem(
          destinationItems,
          sourceCurrency
        );
        reset({
          [TRANSFER_FORM_FIELDS.destinationId]: destinationId,
          [TRANSFER_FORM_FIELDS.amount]: "",
          [TRANSFER_FORM_FIELDS.sourceId]: id
        });
        return;
      }
      reset({
        [TRANSFER_FORM_FIELDS.destinationId]:
          id === destinationId ? sourceId : destinationId,
        [TRANSFER_FORM_FIELDS.amount]: "",
        [TRANSFER_FORM_FIELDS.sourceId]: id
      });
    },
    [
      sourceItems,
      destinationItems,
      fixedSelects,
      reset,
      destinationId,
      sourceId
    ]
  );
  const onChangeDestinationId = useCallback(
    ({ id }: WalletItemType) => {
      if (fixedSelects) {
        const destinationCurrency = getCurrencyByIdInWalletItem(
          destinationItems,
          id
        );
        const sourceId = getIdByCurrencyInWalletItem(
          sourceItems,
          destinationCurrency
        );
        reset({
          [TRANSFER_FORM_FIELDS.destinationId]: id,
          [TRANSFER_FORM_FIELDS.amount]: "",
          [TRANSFER_FORM_FIELDS.sourceId]: sourceId
        });
        return;
      }
      setValue(TRANSFER_FORM_FIELDS.destinationId, id, true);
    },
    [sourceItems, destinationItems, fixedSelects, fixedSelects, setValue]
  );

  const setValuesFromPropsAndSubmit = useCallback(
    values => {
      const { amount, sourceId } = values;
      const transferAll = getTransferAll({ amount, sourceId }, sourceItems);
      return onSubmit({
        ...values,
        transferAll,
        sourceType,
        destinationType,
        destinationCurrency: selectedDestinationItem.currency,
        sourceCurrency: selectedSourceItem.currency
      });
    },
    [
      sourceItems,
      onSubmit,
      sourceType,
      destinationType,
      selectedSourceItem,
      selectedDestinationItem
    ]
  );

  const { available, currency } = getItem(sourceItems, sourceId);

  return (
    <HookForm
      className={styles["transfer-popup"]}
      form={form}
      onSubmit={setValuesFromPropsAndSubmit}
    >
      <DialogTop title={title}>
        <Row size={"large"}>
          <TransferSelectField
            onClickUpdate={sourceType === "Wallet" ? updateWallets : undefined}
            currency={selectedSourceItem.currency}
            name={TRANSFER_FORM_FIELDS.sourceId}
            value={formattedAvailableSourceItem}
            label={t("transfer:from")}
            onChange={onChangeSourceId}
            items={sourceItems}
            sourceType={sourceType}
          />
        </Row>
      </DialogTop>
      <DialogBottom>
        <TransferSelectField
          onClickUpdate={
            destinationType === "Wallet" ? updateWallets : undefined
          }
          currency={selectedDestinationItem.currency}
          name={TRANSFER_FORM_FIELDS.destinationId}
          value={formattedAvailableDestinationItem}
          label={t("transfer:to")}
          onChange={onChangeDestinationId}
          items={destinationItemsWithoutCurrent}
          sourceType={destinationType}
        />
        <InputAmountField
          name={TRANSFER_FORM_FIELDS.amount}
          label={t("transfer:amount")}
          currency={selectedSourceItem.currency}
          setMax={setMax}
          isAllowed={isAmountAllow(sourceItems, sourceId)}
          rules={amountRules({
            t,
            available,
            currency
          })}
        />
        {!!amount &&
          selectedDestinationItem.currency !== selectedSourceItem.currency && (
            <Row>
              <span>{`≈ ${formatCurrencyValue(
                +amount / rate,
                selectedDestinationItem.currency
              )} ${selectedDestinationItem.currency}`}</span>
            </Row>
          )}
        {errorMessage && <FormError error={errorMessage} />}
        <DialogButtons>
          <SubmitButton wide isSuccessful={!errorMessage}>
            {t("buttons.confirm")}
          </SubmitButton>
        </DialogButtons>
        {destinationType !== "ExchangeAccount" &&
          sourceType !== "ExchangeAccount" && (
            <DialogInfo>{t("transfer:info")}</DialogInfo>
          )}
      </DialogBottom>
    </HookForm>
  );
};

const TransferForm = React.memo(_TransferForm);
export default TransferForm;
