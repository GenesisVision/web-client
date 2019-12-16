import "./convert-fields.scss";

import ConvertField from "components/wallet/components/wallet-tables/wallet-transactions/convert-field";
import { AmountRowCell } from "gv-api-web";
import AmountItem from "modules/transaction-details/transactions/amount-item";
import React from "react";

const _WalletConvert: React.FC<{
  amount: AmountRowCell;
}> = ({ amount: { first, second } }) => {
  return (
    <ConvertField
      first={<AmountItem amount={first} />}
      second={second && <AmountItem amount={second} />}
    />
  );
};
const WalletConvert = React.memo(_WalletConvert);
export default WalletConvert;
