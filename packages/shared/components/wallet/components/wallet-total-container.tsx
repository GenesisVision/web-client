import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "shared/reducers/root-reducer";

import {
  copyTradingAccountsSelector,
  walletSelector
} from "../reducers/wallet.reducers";
import { walletMultiSummaryLoaderData } from "./wallet-container-loader";
import WalletTotal from "./wallet-total";

const _WalletTotalContainer: React.FC = () => {
  const wallet = useSelector(walletSelector);
  const copyTradingAccounts = useSelector(copyTradingAccountsSelector);
  const copyTradingAccountsPending = useSelector(
    (state: RootState) => state.copyTradingAccounts.info.isPending
  );
  return (
    <WalletTotal
      loaderData={walletMultiSummaryLoaderData}
      data={wallet!}
      copyTradingAccounts={copyTradingAccounts}
      copyTradingAccountsPending={copyTradingAccountsPending}
    />
  );
};

const WalletTotalContainer = React.memo(_WalletTotalContainer);
export default WalletTotalContainer;
