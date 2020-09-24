import { DefaultBlock } from "components/default.block/default.block";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import useTab from "hooks/tab.hook";
import { ChartContainer } from "pages/trade/binance-trade-page/trading/chart/chart.container";
import { TerminalDefaultBlock } from "pages/trade/binance-trade-page/trading/components/terminal-default-block/terminal-default-block";
import { OrderBookContainer } from "pages/trade/binance-trade-page/trading/order-book/order-book.container";
import { TradesContainer } from "pages/trade/binance-trade-page/trading/trades/trades.container";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./terminal-mobile-chart-block.module.scss";

enum TABS {
  CHART = "CHART",
  TRADES = "TRADES",
  ORDER_BOOK = "ORDER_BOOK"
}

export const TerminalMobileChartBlock: React.FC = () => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.CHART);
  return (
    <TerminalDefaultBlock className={styles["terminal-mobile-chart-block"]}>
      <DefaultBlock
        horizontalOffsets={false}
        verticalOffsets={false}
        size={"small"}
      >
        <GVTabs value={tab} onChange={setTab}>
          <GVTab value={TABS.CHART} label={t("Chart")} />
          <GVTab value={TABS.TRADES} label={t("Trades")} />
          <GVTab value={TABS.ORDER_BOOK} label={t("Order book")} />
        </GVTabs>
      </DefaultBlock>
      <div className={styles["terminal-mobile-chart-block__tables-container"]}>
        {tab === TABS.CHART && <ChartContainer />}
        {tab === TABS.ORDER_BOOK && <OrderBookContainer />}
        {tab === TABS.TRADES && <TradesContainer />}
      </div>
    </TerminalDefaultBlock>
  );
};
