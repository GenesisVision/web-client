import withLoader from "decorators/with-loader";
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
  <div className="invest-popup__currency">
    <NumberFormat
      value={formatCurrencyValue(convertFromCurrency(amount, rate), currency)}
      prefix="≈ "
      suffix={` ${currency}`}
      displayType="text"
    />
  </div>
);
export const ConvertCurrency = withLoader(React.memo(_ConvertCurrency));
