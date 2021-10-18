import { DefaultBlock } from "components/default.block/default.block";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import useTab from "hooks/tab.hook";
import { FundsContainer } from "pages/trade/binance-trade-page/trading/trading-tables/funds/funds.container";
import { OpenOrdersContainer } from "pages/trade/binance-trade-page/trading/trading-tables/open-orders/open-orders.container";
import { OrderHistoryContainer } from "pages/trade/binance-trade-page/trading/trading-tables/order-history/order-history.container";
import { TradeHistoryContainer } from "pages/trade/binance-trade-page/trading/trading-tables/trade-history/trade-history.container";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./trading-tables.module.scss";

enum TABS {
  OPEN_ORDERS = "OPEN_ORDERS",
  ORDER_HISTORY = "ORDER_HISTORY",
  TRADE_HISTORY = "TRADE_HISTORY",
  FUNDS = "FUNDS"
}

const _TradingTablesSpot: React.FC = () => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_ORDERS);

  return (
    <>
      <DefaultBlock verticalOffsets={false} size={"small"}>
        <GVTabs value={tab} onChange={setTab}>
          <GVTab value={TABS.OPEN_ORDERS} label={t("Open orders")} />
          <GVTab value={TABS.ORDER_HISTORY} label={t("Order history")} />
          <GVTab value={TABS.TRADE_HISTORY} label={t("Trade history")} />
          <GVTab value={TABS.FUNDS} label={t("Funds")} />
        </GVTabs>
      </DefaultBlock>
      <div className={styles["trading-tables__tables-container"]}>
        {tab === TABS.OPEN_ORDERS && <OpenOrdersContainer />}
        {tab === TABS.ORDER_HISTORY && <OrderHistoryContainer />}
        {tab === TABS.TRADE_HISTORY && <TradeHistoryContainer />}
        {tab === TABS.FUNDS && <FundsContainer />}
      </div>
    </>
  );
};

export const TradingTablesSpot = React.memo(_TradingTablesSpot);
