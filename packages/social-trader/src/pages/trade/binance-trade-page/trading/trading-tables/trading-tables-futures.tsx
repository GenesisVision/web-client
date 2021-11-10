import { DefaultBlock } from "components/default.block/default.block";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import useTab from "hooks/tab.hook";
import { OpenOrdersContainer } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.container";
import { OrderHistoryContainer } from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history.container";
import { PositionsContainer } from "pages/trade/binance-trade-page/trading/trading-tables/positions/positions.container";
import { TradeHistoryContainer } from "pages/trade/binance-trade-page/trading/trading-tables/trade-history/trade-history.container";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { TerminalFuturesPositionsContext } from "../contexts/terminal-futures-positions.context";
import { TerminalOpenOrdersContext } from "../contexts/terminal-open-orders.context";
import styles from "./trading-tables.module.scss";
import { TransactionHistoryContainer } from "./transaction-history/transaction-history.container";

enum TABS {
  POSITIONS = "POSITIONS",
  OPEN_ORDERS = "OPEN_ORDERS",
  ORDER_HISTORY = "ORDER_HISTORY",
  TRADE_HISTORY = "TRADE_HISTORY",
  TRANSACTION_HISTORY = "TRANSACTION_HISTORY",
  ASSETS = "ASSETS"
}

const _TradingTablesFutures: React.FC = () => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.POSITIONS);
  const { openPositions } = useContext(TerminalFuturesPositionsContext);
  const { openOrders } = useContext(TerminalOpenOrdersContext);

  return (
    <>
      <DefaultBlock verticalOffsets={false} size={"small"}>
        <GVTabs value={tab} onChange={setTab}>
          <GVTab
            value={TABS.POSITIONS}
            label={t(`Positions(${openPositions.length})`)}
          />
          <GVTab
            value={TABS.OPEN_ORDERS}
            label={t(`Open orders(${openOrders.length})`)}
          />
          <GVTab value={TABS.ORDER_HISTORY} label={t("Order history")} />
          <GVTab value={TABS.TRADE_HISTORY} label={t("Trade history")} />
          <GVTab
            value={TABS.TRANSACTION_HISTORY}
            label={t("Transaction history")}
          />
          <GVTab value={TABS.ASSETS} label={t("Assets")} />
        </GVTabs>
      </DefaultBlock>
      <div className={styles["trading-tables__tables-container"]}>
        {tab === TABS.POSITIONS && <PositionsContainer />}
        {tab === TABS.OPEN_ORDERS && <OpenOrdersContainer />}
        {tab === TABS.ORDER_HISTORY && <OrderHistoryContainer />}
        {tab === TABS.TRADE_HISTORY && <TradeHistoryContainer />}
        {tab === TABS.TRANSACTION_HISTORY && <TransactionHistoryContainer />}
        {tab === TABS.ASSETS && null}
      </div>
    </>
  );
};

export const TradingTablesFutures = React.memo(_TradingTablesFutures);
