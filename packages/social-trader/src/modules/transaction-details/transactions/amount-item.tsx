import "../transaction-details.scss";

import { CurrencyItem } from "components/currency-item/currency-item";
import { AmountItem as AmountItemType } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

const _AmountItem: React.FC<Props> = ({
  amount: { amount, currency, logo }
}) => {
  return (
    <div className="amount-item">
      <div className="amount-item__amount">
        <NumberFormat
          value={formatValue(amount, DEFAULT_DECIMAL_SCALE)}
          allowNegative={true}
          displayType="text"
        />
      </div>
      <CurrencyItem name={currency} logo={logo} small clickable={false} />
    </div>
  );
};

interface Props {
  amount: AmountItemType;
}

const AmountItem = React.memo(_AmountItem);
export default AmountItem;
