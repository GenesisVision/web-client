import { WalletData } from "gv-api-web";
import LineTransferButton from "pages/wallet/components/wallet-tables/buttons/line-transfer-button";
import * as React from "react";

import LineDepositButton from "../buttons/line-deposit-button";
import LineWithdrawButton from "../buttons/line-withdraw-button";

const _WalletListButton: React.FC<IWalletListButton> = ({ wallet }) => {
  const { currency, isWithdrawalEnabled, isDepositEnabled } = wallet;
  return (
    <div className="wallet-list__buttons">
      <LineTransferButton wallet={wallet} />
      <LineWithdrawButton currency={currency} disabled={!isWithdrawalEnabled} />
      <LineDepositButton currency={currency} disabled={!isDepositEnabled} />
    </div>
  );
};

interface IWalletListButton {
  wallet: WalletData;
}

const WalletListButton = React.memo(_WalletListButton);
export default WalletListButton;
