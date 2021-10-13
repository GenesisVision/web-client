import { CurrencyItem } from "components/currency-item/currency-item";
import { HookFormWalletField as WalletSelect } from "components/deposit/components/form-fields/wallet-field";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { DialogTop } from "components/dialog/dialog-top";
import FormError from "components/form/form-error/form-error";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { useGetRate } from "hooks/get-rate.hook";
import {
  amountRules,
  ASSETS_FORM_FIELDS,
  AssetsTransferFormValues,
  IAssetsTransferFormProps,
  isAmountAllow
} from "modules/assets-table/components/asset-transfer/assets-transfer-form.helpers";
import {
  getItem,
  getTransferAll
} from "modules/transfer/services/transfer.services";
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { HookForm } from "utils/hook-form.helpers";

const _AssetsSellForm: React.FC<IAssetsTransferFormProps> = ({
  updateWallets,
  walletId,
  sourceType,
  coinsId,
  destinationType,
  onSubmit,
  wallets,
  asset,
  errorMessage
}) => {
  const [t] = useTranslation();

  const form = useForm<AssetsTransferFormValues>({
    defaultValues: {
      [ASSETS_FORM_FIELDS.amount]: "",
      [ASSETS_FORM_FIELDS.destinationId]: walletId
    },
    mode: "onChange"
  });
  const { reset, watch, setValue } = form;
  const { destinationId, amount } = watch();

  const selectedItem = useMemo(
    (): WalletItemType => getItem(wallets, destinationId),
    [wallets, destinationId]
  );

  const formattedAvailableSourceItem = formatCurrencyValue(asset.amount, "Any");

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
        [ASSETS_FORM_FIELDS.destinationId]: id
      });
    },
    [wallets, reset]
  );

  const setValuesFromPropsAndSubmit = useCallback(
    values => {
      const { amount, sourceId } = values;
      const transferAll = getTransferAll({ amount, sourceId }, wallets);
      return onSubmit({
        ...values,
        [ASSETS_FORM_FIELDS.transferAll]: transferAll,
        [ASSETS_FORM_FIELDS.sourceId]: coinsId,
        [ASSETS_FORM_FIELDS.destinationType]: destinationType,
        [ASSETS_FORM_FIELDS.sourceType]: sourceType
      });
    },
    [wallets, onSubmit, coinsId, destinationType, sourceType]
  );

  const amountInAssetCurrency = +amount / rate;

  const commission = useMemo(() => amountInAssetCurrency * 0.001, [
    amountInAssetCurrency
  ]);

  return (
    <HookForm form={form} onSubmit={setValuesFromPropsAndSubmit}>
      <DialogTop title={t("assets-page:popup.sell-title")}>
        <Row size={"large"}>
          <LabeledValue label={t("assets-page:popup.asset")}>
            <CurrencyItem
              url={asset.url}
              logo={asset.logoUrl}
              name={`${asset.asset}`}
              amount={asset.amount}
              clickable={false}
              small
            />
          </LabeledValue>
        </Row>
      </DialogTop>
      <DialogBottom>
        <Row>
          <WalletSelect
            onClickUpdate={updateWallets}
            name={ASSETS_FORM_FIELDS.destinationId}
            label={t("assets-page:popup.from")}
            onChange={onChangeSourceId}
            wallets={wallets}
          />
        </Row>
        <InputAmountField
          name={ASSETS_FORM_FIELDS.amount}
          label={t("assets-page:popup.amount")}
          currency={asset.asset}
          setMax={setMax}
          isAllowed={isAmountAllow("Any", asset.amount)}
          rules={amountRules({
            t,
            available: asset.amount,
            currency: "Any"
          })}
        />
        {errorMessage && <FormError error={errorMessage} />}
        {!!amount && (
          <DialogList>
            <NumberFormat
              value={formatCurrencyValue(
                amountInAssetCurrency,
                selectedItem.currency
              )}
              prefix={"≈ "}
              suffix={` ${selectedItem.currency}`}
              displayType="text"
            />
            <DialogListItem label={t("assets-page:popup.fee")}>
              <NumberFormat
                value={formatCurrencyValue(commission, "Any")}
                prefix={"≈ "}
                suffix={` ${selectedItem.currency}`}
                displayType="text"
              />
            </DialogListItem>
          </DialogList>
        )}
        <DialogButtons>
          <SubmitButton wide isSuccessful={!errorMessage}>
            {t("buttons.confirm")}
          </SubmitButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

const AssetsSellForm = React.memo(_AssetsSellForm);
export default AssetsSellForm;
