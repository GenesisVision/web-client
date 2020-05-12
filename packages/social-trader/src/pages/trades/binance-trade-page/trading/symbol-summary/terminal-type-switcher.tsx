import { DoubleButton } from "components/double-button/double-button";
import { GV_BTN_SIZE } from "components/gv-button";
import { Push } from "components/link/link";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { stringifySymbolFromToParam } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { TerminalType } from "pages/trades/binance-trade-page/trading/trading.types";
import * as qs from "qs";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { BINANCE_ROUTE } from "routes/trade.routes";

import styles from "./symbol-summary.module.scss";

export const TerminalTypeSwitcher: React.FC = () => {
  const [t] = useTranslation();
  const { terminalType, symbol } = useContext(TradingInfoContext);

  const symbolPath = stringifySymbolFromToParam(symbol);
  const handleSelectType = useCallback(
    (type: TerminalType) => () => {
      const terminalTypeParam = qs.stringify({ type });
      const route = `${BINANCE_ROUTE}/${symbolPath}?${terminalTypeParam}`;
      Push(route);
    },
    [symbolPath]
  );
  return (
    <div className={styles["symbol-summary__type-switcher"]}>
      <DoubleButton
        size={GV_BTN_SIZE.SMALL}
        first={{
          selected: terminalType === "spot",
          enable: true,
          handleClick: handleSelectType("spot"),
          label: t("Spot")
        }}
        second={{
          selected: terminalType === "futures",
          enable: true,
          handleClick: handleSelectType("futures"),
          label: t("Futures")
        }}
      />
    </div>
  );
};
