import "./wallet-add-funds-form.scss";

import { DialogLoader } from "components/dialog/dialog-loader/dialog-loader";
import { WalletData } from "gv-api-web";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import * as React from "react";
import { useSelector } from "react-redux";

import WalletAddFundsForm from "./wallet-add-funds-form";

const _WalletAddFundsContainer: React.FC<Props> = ({ currentWallet }) => {
  const wallets = useSelector(walletsSelector);
  return (
    <WalletAddFundsForm
      condition={!!wallets.length && !!currentWallet}
      loader={<DialogLoader />}
      wallets={wallets.filter(wallet => wallet.isDepositEnabled)}
      currentWallet={currentWallet}
    />
  );
};

interface Props {
  currentWallet: WalletData;
}

const WalletAddFundsContainer = React.memo(_WalletAddFundsContainer);
export default WalletAddFundsContainer;
