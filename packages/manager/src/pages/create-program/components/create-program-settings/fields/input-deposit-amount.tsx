import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _InputDepositAmount: React.FC<Props> = ({
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
    <>
      <InputAmountField
        autoFocus={false}
        name={name}
        label={t("transfer.amount")}
        currency={walletCurrency}
        isAllow={isAmountAllow(walletCurrency)}
        setMax={setMaxAmount(walletAvailable, walletCurrency)}
      />
      {assetCurrency !== walletCurrency && depositAmount && (
        <div className="invest-popup__currency">
          <NumberFormat
            value={formatCurrencyValue(
              convertFromCurrency(depositAmount, rate),
              assetCurrency
            )}
            prefix="≈ "
            suffix={` ${assetCurrency}`}
            displayType="text"
          />
        </div>
      )}
    </>
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
}

const InputDepositAmount = React.memo(_InputDepositAmount);
export default InputDepositAmount;
