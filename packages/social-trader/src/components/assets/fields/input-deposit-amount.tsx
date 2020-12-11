import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

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
    <>
      <InputAmountField
        showCorrect
        wide
        disabled={disabled}
        autoFocus={false}
        name={name}
        label={t("transfer:amount")}
        currency={walletCurrency}
        isAllowed={isAmountAllow(walletCurrency)}
        setMax={setMax}
        setMin={setMin}
      />
      {assetCurrency !== walletCurrency && depositAmount && (
        <Row>
          <NumberFormat
            value={formatCurrencyValue(
              convertFromCurrency(depositAmount, rate),
              assetCurrency
            )}
            prefix="≈ "
            suffix={` ${assetCurrency}`}
            displayType="text"
          />
        </Row>
      )}
    </>
  );
};

const InputDepositAmount = React.memo(_InputDepositAmount);
export default InputDepositAmount;
