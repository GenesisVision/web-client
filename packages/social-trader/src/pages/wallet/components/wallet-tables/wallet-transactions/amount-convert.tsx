import Crashable from "decorators/crashable";
import { AmountRowCell } from "gv-api-web";
import AmountItem from "pages/wallet/components/transaction-details/transactions/amount-item";
import ConvertField from "pages/wallet/components/wallet-tables/wallet-transactions/convert-field";
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
const AmountConvert = React.memo(Crashable(_AmountConvert));
export default AmountConvert;
