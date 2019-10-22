import * as React from "react";
import NumberFormat from "react-number-format";
import withLoader from "shared/decorators/with-loader";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

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
