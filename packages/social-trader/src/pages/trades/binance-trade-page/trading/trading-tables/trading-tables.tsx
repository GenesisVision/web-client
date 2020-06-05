import { DefaultBlock } from "components/default.block/default.block";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { SIZES } from "constants/constants";
import useTab from "hooks/tab.hook";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { FundsContainer } from "pages/trades/binance-trade-page/trading/trading-tables/funds/funds.container";
import { OpenOrdersContainer } from "pages/trades/binance-trade-page/trading/trading-tables/open-orders/open-orders.container";
import { OrderHistoryContainer } from "pages/trades/binance-trade-page/trading/trading-tables/order-history/order-history.container";
import { PositionsContainer } from "pages/trades/binance-trade-page/trading/trading-tables/positions/positions.container";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./trading-tables.module.scss";

enum TABS {
  POSITIONS = "POSITIONS",
  OPEN_ORDERS = "OPEN_ORDERS",
  ORDER_HISTORY = "ORDER_HISTORY",
  TRADE_HISTORY = "TRADE_HISTORY",
  FUNDS = "FUNDS"
}

interface Props {}

const _TradingTables: React.FC<Props> = () => {
  const { terminalType } = useContext(TerminalInfoContext);
  const isFutures = terminalType === "futures";
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_ORDERS);

  useEffect(() => {
    setTab(null, TABS.OPEN_ORDERS);
  }, [terminalType]);
  return (
    <DefaultBlock
      size={SIZES.SMALL}
      horizontalOffsets={false}
      roundedBorder={false}
      bordered
      className={styles["trading-tables"]}
    >
      <DefaultBlock verticalOffsets={false} size={SIZES.SMALL}>
        <GVTabs value={tab} onChange={setTab}>
          <GVTab value={TABS.OPEN_ORDERS} label={t("Open orders")} />
          <GVTab
            visible={isFutures}
            value={TABS.POSITIONS}
            label={t("Positions")}
          />
          <GVTab value={TABS.ORDER_HISTORY} label={t("Order history")} />
          <GVTab value={TABS.TRADE_HISTORY} label={t("Trade history")} />
          <GVTab value={TABS.FUNDS} label={t("Funds")} />
        </GVTabs>
      </DefaultBlock>
      <div className={styles["trading-tables__tables-container"]}>
        {tab === TABS.POSITIONS && isFutures && <PositionsContainer />}
        {tab === TABS.OPEN_ORDERS && <OpenOrdersContainer />}
        {tab === TABS.ORDER_HISTORY && <OrderHistoryContainer />}
        {tab === TABS.FUNDS && <FundsContainer />}
      </div>
    </DefaultBlock>
  );
};

export const TradingTables = React.memo(_TradingTables);
