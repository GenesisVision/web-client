import "./transfer-form.scss";

import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogField } from "components/dialog/dialog-field";
import { DialogInfo } from "components/dialog/dialog-info";
import { DialogTop } from "components/dialog/dialog-top";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { withBlurLoader } from "decorators/with-blur-loader";
import { useGetRate } from "hooks/get-rate.hook";
import { TransferSelectField } from "modules/transfer/components/transfer-form-select-field";
import {
  formatWalletItemValue,
  isAmountAllow,
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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { minTransferAmountsSelector } from "reducers/platform-reducer";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

const _TransferForm: React.FC<ITransferFormProps> = ({
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
      sourceItems,
      destinationItems,
      currentItem,
      currentItemContainer
    }),
    validationSchema: transferFormValidationSchema({ sourceItems, t }),
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

  const minAmounts = useSelector(minTransferAmountsSelector);
  const minAmountInCur = formatCurrencyValue(
    safeGetElemFromArray(
      minAmounts,
      amount => amount.name === selectedSourceItem.currency
    ).minConvertAmount,
    selectedSourceItem.currency
  );

  const setMax = useCallback(() => {
    setValue(TRANSFER_FORM_FIELDS.amount, +formattedAvailableSourceItem, true);
  }, [formattedAvailableSourceItem]);

  const onChangeSourceId = useCallback(
    ({ id }: WalletItemType) => {
      reset({
        [TRANSFER_FORM_FIELDS.destinationId]:
          id === destinationId ? sourceId : destinationId,
        [TRANSFER_FORM_FIELDS.amount]: "",
        [TRANSFER_FORM_FIELDS.sourceId]: id
      });
    },
    [reset, destinationId, sourceId]
  );
  const onChangeDestinationId = useCallback(
    ({ id }: WalletItemType) =>
      setValue(TRANSFER_FORM_FIELDS.destinationId, id, true),
    [setValue]
  );

  const setValuesFromPropsAndSubmit = useCallback(
    values => {
      const { amount, sourceId } = values;
      const transferAll = getTransferAll({ amount, sourceId }, sourceItems);
      return onSubmit({ ...values, transferAll, sourceType, destinationType });
    },
    [sourceItems, onSubmit, sourceType, destinationType]
  );

  return (
    <HookForm
      className="transfer-popup"
      form={form}
      onSubmit={setValuesFromPropsAndSubmit}
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
            name={TRANSFER_FORM_FIELDS.amount}
            label={t("transfer.amount")}
            currency={selectedSourceItem.currency}
            setMax={setMax}
            isAllowed={isAmountAllow(sourceItems, sourceId)}
          />
        </DialogField>
        {!!amount &&
          selectedDestinationItem.currency !== selectedSourceItem.currency && (
            <span>{`≈ ${formatCurrencyValue(
              +amount / rate,
              selectedDestinationItem.currency
            )} ${selectedDestinationItem.currency}`}</span>
          )}
        <DialogError error={errorMessage} />
        <DialogButtons>
          <SubmitButton wide isSuccessful={!errorMessage}>
            {t("buttons.confirm")}
          </SubmitButton>
        </DialogButtons>
        <DialogInfo>{t("transfer.info")}</DialogInfo>
      </DialogBottom>
    </HookForm>
  );
};

const TransferForm = withBlurLoader(React.memo(_TransferForm));
export default TransferForm;
