import * as React from "react";
import { useSelector } from "react-redux";

import { walletSelector } from "../reducers/wallet.reducers";
import { walletMultiSummaryLoaderData } from "./wallet-container-loader";
import WalletTotal from "./wallet-total";

const _WalletTotalContainer: React.FC = () => {
  const wallet = useSelector(walletSelector);

  return (
    <WalletTotal loaderData={walletMultiSummaryLoaderData} data={wallet!} />
  );
};

const WalletTotalContainer = React.memo(_WalletTotalContainer);
export default WalletTotalContainer;
