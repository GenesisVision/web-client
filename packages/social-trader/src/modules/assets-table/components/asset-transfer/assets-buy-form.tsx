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
import { RowItem } from "components/row-item/row-item";
import { SubmitButton } from "components/submit-button/submit-button";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { ASSET_COMMISSION } from "constants/constants";
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

const _AssetsBuyForm: React.FC<IAssetsTransferFormProps> = ({
  updateWallets,
  onSubmit,
  walletId,
  coinsId,
  sourceType,
  destinationType,
  wallets,
  asset,
  errorMessage,
  genesisMarketsDiscountPercent
}) => {
  const [t] = useTranslation();

  const form = useForm<AssetsTransferFormValues>({
    defaultValues: {
      [ASSETS_FORM_FIELDS.amount]: "",
      [ASSETS_FORM_FIELDS.sourceId]: walletId
    },
    mode: "onChange"
  });
  const { reset, watch, setValue } = form;
  const { sourceId, amount } = watch();

  const selectedItem = useMemo(
    (): WalletItemType => getItem(wallets, sourceId),
    [wallets, sourceId]
  );

  const formattedAvailableSourceItem = formatCurrencyValue(
    selectedItem.available,
    "Any"
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
    [wallets, reset]
  );

  const setValuesFromPropsAndSubmit = useCallback(
    values => {
      const { amount, sourceId } = values;
      const transferAll = getTransferAll({ amount, sourceId }, wallets);
      return onSubmit({
        ...values,
        [ASSETS_FORM_FIELDS.transferAll]: transferAll,
        [ASSETS_FORM_FIELDS.destinationId]: coinsId,
        [ASSETS_FORM_FIELDS.destinationType]: destinationType,
        [ASSETS_FORM_FIELDS.sourceType]: sourceType
      });
    },
    [wallets, onSubmit]
  );

  const amountInAssetCurrency = +amount * rate;

  const commission = useMemo(() => {
    const ratio =
      selectedItem.currency === asset.asset
        ? 0
        : ASSET_COMMISSION * (1 - genesisMarketsDiscountPercent / 100);
    return amountInAssetCurrency * ratio;
  }, [
    amountInAssetCurrency,
    selectedItem.currency,
    asset.asset,
    genesisMarketsDiscountPercent
  ]);

  return (
    <HookForm form={form} onSubmit={setValuesFromPropsAndSubmit}>
      <DialogTop title={t("assets-page:popup.buy-title")}>
        <Row size={"large"}>
          <WalletSelect
            onClickUpdate={updateWallets}
            name={ASSETS_FORM_FIELDS.sourceId}
            label={t("assets-page:popup.from")}
            onChange={onChangeSourceId}
            wallets={wallets}
          />
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
          isAllowed={isAmountAllow("Any", selectedItem.available)}
          rules={amountRules({
            t,
            available: selectedItem.available,
            currency: "Any"
          })}
        />
        {errorMessage && <FormError error={errorMessage} />}
        {!!amount && (
          <DialogList>
            <Row>
              <RowItem size="xsmall">
                <NumberFormat
                  value={formatCurrencyValue(
                    amountInAssetCurrency,
                    asset.asset
                  )}
                  prefix={"≈ "}
                  suffix={` ${asset.asset}`}
                  displayType="text"
                />
              </RowItem>
              <TooltipLabel tooltipContent={t("assets-page:popup.tooltip")} />
            </Row>
            <DialogListItem label={t("assets-page:popup.fee")}>
              <NumberFormat
                value={formatCurrencyValue(commission, "Any")}
                prefix={commission === 0 ? "" : "≈ "}
                suffix={` ${asset.asset}`}
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

const AssetsBuyForm = React.memo(_AssetsBuyForm);
export default AssetsBuyForm;
