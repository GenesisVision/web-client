import "./wallet-balance.scss";

import * as React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";

import WalletBalanceLoader from "./wallet-balance-loader";
import WalletSettingsLoader from "./wallet-settings-loader";

const WalletContainerLoader = () => (
  <div className="wallet-balance">
    <div className="wallet-balance__wrapper">
      <SvgLoader height={72} width={280}>
        <rect x="0" y="0" width="250" height="40" rx="8" ry="8" />
      </SvgLoader>
      <WalletSettingsLoader />
    </div>
    <WalletBalanceLoader />
  </div>
);

export default WalletContainerLoader;
