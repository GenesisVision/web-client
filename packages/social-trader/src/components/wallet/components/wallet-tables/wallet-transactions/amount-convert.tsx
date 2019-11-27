import "./convert-fields.scss";

import { AmountRowCell } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

const _AmountConvert: React.FC<{
  amount: AmountRowCell;
}> = ({ amount: { first, second } }) => {
  return (
    <div className="convert-field">
      {first && (
        <span className="wallet-transactions__col">
          <NumberFormat
            value={formatValue(first.amount, DEFAULT_DECIMAL_SCALE)}
            thousandSeparator=" "
            displayType="text"
            suffix={` ${first.currency}`}
          />
        </span>
      )}
      <span className="wallet-transactions__back-arrow">&rarr;</span>
      {second && (
        <span className="wallet-transactions__col">
          <NumberFormat
            value={formatValue(second.amount, DEFAULT_DECIMAL_SCALE)}
            thousandSeparator=" "
            displayType="text"
            suffix={` ${second.currency}`}
          />
        </span>
      )}
    </div>
  );
};
const AmountConvert = React.memo(_AmountConvert);
export default AmountConvert;
