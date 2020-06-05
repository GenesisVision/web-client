import { DoubleButton } from "components/double-button/double-button";
import { GV_BTN_SIZE } from "components/gv-button";
import { Push } from "components/link/link";
import { useParams } from "hooks/location";
import { TerminalType } from "pages/trades/binance-trade-page/trading/terminal.types";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { stringifySymbolFromToParam } from "pages/trades/binance-trade-page/trading/trading.helpers";
import * as qs from "qs";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { TERMINAL_FOLDER_ROUTE, TERMINAL_ROUTE } from "routes/trade.routes";

import styles from "./symbol-summary.module.scss";

export const TerminalTypeSwitcher: React.FC = () => {
  const [t] = useTranslation();
  const params = useParams();
  const { terminalType, symbol } = useContext(TradingInfoContext);

  const symbolPath = stringifySymbolFromToParam(symbol);
  const handleSelectType = useCallback(
    (type: TerminalType) => () => {
      const parsedParams = qs.parse(params || "");
      const newParams = qs.stringify({ ...parsedParams, type });
      const route = `${TERMINAL_ROUTE}/${symbolPath}?${newParams}`;
      Push(TERMINAL_FOLDER_ROUTE, route);
    },
    [params, symbolPath]
  );
  return (
    <div className={styles["symbol-summary__type-switcher"]}>
      <DoubleButton
        size={GV_BTN_SIZE.SMALL}
        first={{
          selected: terminalType === "spot",
          enable: terminalType !== "spot",
          handleClick: handleSelectType("spot"),
          label: t("Spot")
        }}
        second={{
          selected: terminalType === "futures",
          enable: terminalType !== "futures",
          handleClick: handleSelectType("futures"),
          label: t("Futures")
        }}
      />
    </div>
  );
};
