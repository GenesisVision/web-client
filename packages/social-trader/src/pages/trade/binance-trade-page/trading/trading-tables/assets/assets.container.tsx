import React, { useContext, useMemo } from "react";

import { TerminalFuturesBalanceContext } from "../../contexts/terminal-futures-balance.context";
import { withTradingTable } from "../with-trading-table";
import { Assets } from "./assets";
import {
  createBnbFuturesTableAsset,
  useUsdtFuturesTableAsset
} from "./assets.helpers";

const AssetsContainer: React.FC = () => {
  const { futuresBalance, bnbFuturesBalance } = useContext(
    TerminalFuturesBalanceContext
  );

  const usdtFuturesAsset = useUsdtFuturesTableAsset(futuresBalance);

  const bnbFuturesAsset = useMemo(() => {
    return bnbFuturesBalance
      ? createBnbFuturesTableAsset(bnbFuturesBalance)
      : undefined;
  }, [bnbFuturesBalance]);

  if (!usdtFuturesAsset || !bnbFuturesAsset) {
    return null;
  }

  return (
    <Assets
      usdtFuturesBalance={usdtFuturesAsset}
      bnbFuturesBalance={bnbFuturesAsset}
    />
  );
};

export default withTradingTable(AssetsContainer);
