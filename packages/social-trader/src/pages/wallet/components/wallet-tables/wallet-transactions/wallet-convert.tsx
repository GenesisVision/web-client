import { CurrencyItem } from "components/currency-item/currency-item";
import { AmountRowCell } from "gv-api-web";
import ConvertField from "pages/wallet/components/wallet-tables/wallet-transactions/convert-field";
import React from "react";

const _WalletConvert: React.FC<{
  wallets: AmountRowCell;
}> = ({ wallets: { first, second } }) => {
  return (
    <ConvertField
      first={
        <CurrencyItem
          name={first.currency}
          logo={first.logo}
          small
          clickable={false}
        />
      }
      second={
        second && (
          <CurrencyItem
            name={second.currency}
            logo={second.logo}
            small
            clickable={false}
          />
        )
      }
    />
  );
};
const WalletConvert = React.memo(_WalletConvert);
export default WalletConvert;
