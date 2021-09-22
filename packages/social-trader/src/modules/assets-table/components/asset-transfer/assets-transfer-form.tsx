import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import FormError from "components/form/form-error/form-error";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { useGetRate } from "hooks/get-rate.hook";
import {
  getItem,
  getTransferAll
} from "modules/transfer/services/transfer.services";
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { HookForm } from "utils/hook-form.helpers";

import { HookFormWalletField as WalletSelect } from "components/deposit/components/form-fields/wallet-field";
import { CurrencyItem } from "components/currency-item/currency-item";
import {
  amountRules,
  AssetsTransferFormValues,
  ASSETS_FORM_FIELDS,
  IAssetsTransferFormProps,
  isAmountAllow
} from "modules/assets-table/components/asset-transfer/assets-transfer-form.helpers";
import { Text } from "components/text/text";
import { GvInputLabel } from "components/gv-input/gv-input-label";
import { LabeledValue } from "components/labeled-value/labeled-value";

const _AssetsTransferForm: React.FC<IAssetsTransferFormProps> = ({
  updateWallets,
  currentItemId,
  onSubmit,
  title,
  sourceItems,
  asset,
  errorMessage
}) => {
  const [t] = useTranslation();

  const form = useForm<AssetsTransferFormValues>({
    defaultValues: {
      [ASSETS_FORM_FIELDS.amount]: "",
      [ASSETS_FORM_FIELDS.sourceId]: currentItemId
    },
    mode: "onChange"
  });
  const { reset, watch, setValue } = form;
  const { sourceId, amount } = watch();

  const selectedItem = useMemo(
    (): WalletItemType => getItem(sourceItems, sourceId),
    [sourceItems, sourceId]
  );

  const formattedAvailableSourceItem = formatCurrencyValue(
    selectedItem.available,
    selectedItem.currency
  );

  const { rate, getRate } = useGetRate();

  useEffect(() => {
    getRate({
      from: selectedItem.currency,
      to: asset.asset
    });
  }, [selectedItem.currency, asset.asset]);

  const setMax = useCallback(() => {
    setValue(ASSETS_FORM_FIELDS.amount, +formattedAvailableSourceItem, true);
  }, [formattedAvailableSourceItem]);

  const onChangeSourceId = useCallback(
    ({ id }: WalletItemType) => {
      reset({
        [ASSETS_FORM_FIELDS.amount]: "",
        [ASSETS_FORM_FIELDS.sourceId]: id
      });
    },
    [sourceItems, reset]
  );

  const setValuesFromPropsAndSubmit = useCallback(
    values => {
      const { amount, sourceId } = values;
      const transferAll = getTransferAll({ amount, sourceId }, sourceItems);
      return onSubmit({
        ...values,
        [ASSETS_FORM_FIELDS.transferAll]: transferAll
      });
    },
    [sourceItems, onSubmit]
  );

  return (
    <HookForm form={form} onSubmit={setValuesFromPropsAndSubmit}>
      <DialogTop title={title}>
        <Row size={"large"}>
          {sourceItems && (
            <WalletSelect
              onClickUpdate={updateWallets}
              name={ASSETS_FORM_FIELDS.sourceId}
              label={t("assets-page:popup.from")}
              onChange={onChangeSourceId}
              wallets={sourceItems}
            />
          )}
        </Row>
      </DialogTop>
      <DialogBottom>
        <Row>
          <LabeledValue label={t("assets-page:popup.asset")}>
            <CurrencyItem
              url={asset.url}
              logo={asset.logoUrl}
              name={asset.asset}
              clickable={false}
              small
            />
          </LabeledValue>
        </Row>
        <InputAmountField
          name={ASSETS_FORM_FIELDS.amount}
          label={t("assets-page:popup.amount")}
          currency={selectedItem.currency}
          setMax={setMax}
          isAllowed={isAmountAllow(
            selectedItem.currency,
            selectedItem.available
          )}
          rules={amountRules({
            t,
            available: selectedItem.available,
            currency: selectedItem.currency
          })}
        />
        {!!amount && (
          <Row>
            <span>{`≈ ${formatCurrencyValue(+amount * rate, asset.asset)} ${
              asset.asset
            }`}</span>
          </Row>
        )}
        {errorMessage && <FormError error={errorMessage} />}
        <DialogButtons>
          <SubmitButton wide isSuccessful={!errorMessage}>
            {t("buttons.confirm")}
          </SubmitButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

const AssetsTransferForm = React.memo(_AssetsTransferForm);
export default AssetsTransferForm;
