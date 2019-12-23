import "./wallet-balance.scss";

import { WalletData } from "gv-api-web";
import TransferButton from "modules/transfer/transfer-button";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import WalletDeposit from "modules/wallet-deposit/wallet-deposit";
import WalletWithdrawButton from "modules/wallet-withdraw/wallet-withdraw.button";
import * as React from "react";

const _WalletBalanceButtons: React.FC<Props> = ({ currentItem }) => {
  const { currency, isDepositEnabled, isWithdrawalEnabled } = currentItem;
  return (
    <div className="wallet-balance__buttons">
      <div>
        <WalletDeposit currency={currency} disabled={!isDepositEnabled} />
      </div>
      <div>
        <WalletWithdrawButton
          currency={currency}
          disabled={!isWithdrawalEnabled}
        />
      </div>
      <div>
        <TransferButton
          withIcon
          currentItem={currentItem}
          currentItemContainer={TRANSFER_CONTAINER.SOURCE}
          sourceType={"Wallet"}
          destinationType={"Wallet"}
        />
      </div>
    </div>
  );
};

interface Props {
  currentItem: WalletData;
}

const WalletBalanceButtons = React.memo(_WalletBalanceButtons);
export default WalletBalanceButtons;
