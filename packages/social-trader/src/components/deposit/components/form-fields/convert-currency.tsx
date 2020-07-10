import { Text } from "components/text/text";
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
  <Text muted>
    <NumberFormat
      value={formatCurrencyValue(convertFromCurrency(amount, rate), currency)}
      prefix="≈ "
      suffix={` ${currency}`}
      displayType="text"
    />
  </Text>
);
export const ConvertCurrency = React.memo(_ConvertCurrency);
