import "../transaction-details.scss";

import { AmountItem as AmountItemType } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

const _AmountItem: React.FC<Props> = ({ amount: { amount, currency } }) => {
  return (
    <div className="amount-item">
      <div className="amount-item__amount">
        <NumberFormat
          value={formatValue(amount, DEFAULT_DECIMAL_SCALE)}
          allowNegative={true}
          displayType="text"
        />
      </div>
      {currency}
    </div>
  );
};

interface Props {
  amount: AmountItemType;
}

const AmountItem = React.memo(_AmountItem);
export default AmountItem;
