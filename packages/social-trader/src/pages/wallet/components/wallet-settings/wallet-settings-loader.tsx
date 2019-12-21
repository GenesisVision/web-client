import "../wallet-balance/wallet-balance.scss";

import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";

const WalletSettingsLoader = () => (
  <SvgLoader height={72} width={240}>
    <rect x="0" y="0" width="240" height="40" rx="8" ry="8" />
  </SvgLoader>
);

export default WalletSettingsLoader;
