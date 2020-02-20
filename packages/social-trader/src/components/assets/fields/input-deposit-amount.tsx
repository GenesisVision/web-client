import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import AssetField from "../asset-fields/asset-field";

const _InputDepositAmount: React.FC<Props> = ({
  minAmount,
  disabled,
  rate,
  name,
  setFieldValue,
  assetCurrency,
  depositAmount,
  walletAvailable,
  walletCurrency
}) => {
  const [t] = useTranslation();
  const isAmountAllow = useCallback(
    (currency: CurrencyEnum) => ({ value }: NumberFormatValues) =>
      validateFraction(value, currency),
    []
  );
  const setMax = useCallback(() => {
    setFieldValue(
      name,
      formatCurrencyValue(walletAvailable, walletCurrency),
      true
    );
  }, [name, setFieldValue, walletAvailable, walletCurrency]);
  const setMin = useCallback(() => {
    setFieldValue(name, minAmount, true);
  }, [name, setFieldValue, minAmount, walletCurrency]);
  return (
    <AssetField className="deposit-amount-field">
      <InputAmountField
        showCorrect
        wide
        disabled={disabled}
        autoFocus={false}
        name={name}
        label={t("transfer.amount")}
        currency={walletCurrency}
        isAllow={isAmountAllow(walletCurrency)}
        setMax={setMax}
        setMin={setMin}
      />
      {assetCurrency !== walletCurrency && depositAmount && (
        <NumberFormat
          value={formatCurrencyValue(
            convertFromCurrency(depositAmount, rate),
            assetCurrency
          )}
          prefix="≈ "
          suffix={` ${assetCurrency}`}
          displayType="text"
        />
      )}
    </AssetField>
  );
};

interface Props {
  minAmount: number;
  rate: number;
  name: string;
  setFieldValue: Function;
  assetCurrency: CurrencyEnum;
  walletAvailable: number;
  walletCurrency: CurrencyEnum;
  depositAmount?: number | string;
  disabled?: boolean;
}

const InputDepositAmount = React.memo(_InputDepositAmount);
export default InputDepositAmount;
