import "./convert-fields.scss";

import ConvertField from "components/wallet/components/wallet-tables/wallet-transactions/convert-field";
import { AmountRowCell } from "gv-api-web";
import AmountItem from "modules/transaction-details/transactions/amount-item";
import React from "react";

const _AmountConvert: React.FC<{
  amount: AmountRowCell;
}> = ({ amount: { first, second } }) => {
  return (
    <ConvertField
      first={<AmountItem amount={first} />}
      second={second && <AmountItem amount={second} />}
    />
  );
};
const AmountConvert = React.memo(_AmountConvert);
export default AmountConvert;
