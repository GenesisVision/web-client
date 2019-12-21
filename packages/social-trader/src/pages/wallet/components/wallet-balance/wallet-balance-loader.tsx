import "./wallet-balance.scss";

import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";

const WalletBalanceLoader: React.FC = () => (
  <div className="wallet-balance__wrapper">
    <WalletLoaderStat />
    <WalletLoaderStatIndicator />
    <WalletLoaderStatIndicator />
    <WalletLoaderStatIndicator />
  </div>
);

const WalletLoaderStat = () => (
  <div className="wallet-balance__loader-stat">
    <SvgLoader height={70} width={200}>
      <rect x="0" y="0" width="40" height="15" rx="8" ry="8" />
      <rect x="0" y="25" width="140" height="20" rx="8" ry="8" />
      <rect x="0" y="55" width="100" height="15" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

const WalletLoaderStatIndicator = () => (
  <div className="wallet-balance__loader-stat">
    <SvgLoader height={70} width={200}>
      <circle cx="20" cy="37" r="20" />
      <rect x="60" y="0" width="40" height="15" rx="8" ry="8" />
      <rect x="60" y="25" width="140" height="20" rx="8" ry="8" />
      <rect x="60" y="55" width="100" height="15" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export default WalletBalanceLoader;
