import "./wallet-balance.scss";

import React, { Fragment } from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";

const WalletBalanceLoader = () => {
  return (
    <Fragment>
      <div className="wallet-balance__loader-row">
        <WalletLoaderStat />
        <WalletLoaderStat />
        <WalletLoaderStat />
      </div>
      <div className="wallet-balance__loader-row">
        <WalletLoadeButton />
        <WalletLoadeButton />
      </div>
    </Fragment>
  );
};

const WalletLoaderStat = () => (
  <div className="wallet-balance__loader-stat">
    <SvgLoader height="74" width="220">
      <rect x="0" y="0" width="40" height="15" rx="8" ry="8" />
      <rect x="0" y="28" width="200" height="20" rx="8" ry="8" />
      <rect x="0" y="58" width="100" height="15" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

const WalletLoadeButton = () => (
  <div className="wallet-balance__loader-button">
    <SvgLoader height="50" width="150">
      <rect x="0" y="0" width="150" height="50" rx="26" ry="26" />
    </SvgLoader>
  </div>
);

export default WalletBalanceLoader;
