import InputAmountField from "components/input-amount-field/input-amount-field";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import AssetField from "../asset-fields/asset-field";

const _InputDepositAmount: React.FC<Props> = ({
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
  const setMaxAmount = useCallback(
    (available: number, currency: string) => () => {
      setFieldValue(name, formatCurrencyValue(available, currency));
    },
    [name, setFieldValue]
  );
  return (
    <AssetField className="deposit-amount-field">
      <InputAmountField
        wide
        disabled={disabled}
        autoFocus={false}
        name={name}
        label={t("transfer.amount")}
        currency={walletCurrency}
        isAllow={isAmountAllow(walletCurrency)}
        setMax={setMaxAmount(walletAvailable, walletCurrency)}
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
  rate: number;
  name: string;
  setFieldValue: Function;
  assetCurrency: CurrencyEnum;
  walletAvailable: number;
  walletCurrency: CurrencyEnum;
  depositAmount?: number;
  disabled?: boolean;
}

const InputDepositAmount = React.memo(_InputDepositAmount);
export default InputDepositAmount;
