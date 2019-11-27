import "./convert-fields.scss";

import { CurrencyItem } from "components/currency-item/currency-item";
import { WalletRowCell } from "gv-api-web";
import React from "react";

const _WalletsConvert: React.FC<{
  wallets: WalletRowCell;
}> = ({ wallets: { first, second } }) => {
  return (
    <div className="convert-field">
      {first && (
        <div className="wallet-transactions__col">
          <CurrencyItem logo={first.logo} name={first.currency} small />
        </div>
      )}
      <div className="wallet-transactions__back-arrow">&rarr;</div>
      {second && (
        <div className="wallet-transactions__col">
          <CurrencyItem logo={second.logo} name={second.currency} small />
        </div>
      )}
    </div>
  );
};
const WalletsConvert = React.memo(_WalletsConvert);
export default WalletsConvert;
