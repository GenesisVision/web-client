import { DoubleButton } from "components/double-button/double-button";
import { Push } from "components/link/link";
import { useParams } from "hooks/location";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { stringifySymbolFromToParam } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { TerminalType } from "pages/trade/binance-trade-page/trading/terminal.types";
import * as qs from "qs";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { TERMINAL_FOLDER_ROUTE, TERMINAL_ROUTE } from "routes/trade.routes";

import styles from "./symbol-summary.module.scss";

export const TerminalTypeSwitcher: React.FC = () => {
  const [t] = useTranslation();
  const { parsedParams } = useParams();
  const { terminalType, symbol } = useContext(TerminalInfoContext);

  const symbolPath = stringifySymbolFromToParam(symbol);
  const handleSelectType = useCallback(
    (type: TerminalType) => () => {
      const newParams = qs.stringify({ ...parsedParams, type });
      const route = `${TERMINAL_ROUTE}/${symbolPath}?${newParams}`;
      Push(TERMINAL_FOLDER_ROUTE, route);
    },
    [parsedParams, symbolPath]
  );
  return (
    <div className={styles["symbol-summary__type-switcher"]}>
      <DoubleButton
        size={"small"}
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
