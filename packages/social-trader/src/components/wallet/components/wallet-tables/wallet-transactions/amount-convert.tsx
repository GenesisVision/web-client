import "./convert-fields.scss";

import { AmountRowCell } from "gv-api-web";
import AmountItem from "modules/transaction-details/transactions/amount-item";
import React from "react";

const _AmountConvert: React.FC<{
  amount: AmountRowCell;
}> = ({ amount: { first, second } }) => {
  return (
    <div className="convert-field">
      {first && <AmountItem amount={first} />}
      <span className="wallet-transactions__back-arrow">&rarr;</span>
      {second && <AmountItem amount={second} />}
    </div>
  );
};
const AmountConvert = React.memo(_AmountConvert);
export default AmountConvert;
