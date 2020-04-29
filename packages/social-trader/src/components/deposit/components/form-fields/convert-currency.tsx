import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";
import NumberFormat from "react-number-format";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ConvertCurrency: React.FC<{
  amount: number;
  currency: CurrencyEnum;
  rate: number;
}> = ({ rate, amount, currency }) => (
  <MutedText>
    <NumberFormat
      value={formatCurrencyValue(convertFromCurrency(amount, rate), currency)}
      prefix="≈ "
      suffix={` ${currency}`}
      displayType="text"
    />
  </MutedText>
);
export const ConvertCurrency = React.memo(_ConvertCurrency);
