import { DefaultBlock } from "components/default.block/default.block";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { SIZES } from "constants/constants";
import useTab from "hooks/tab.hook";
import { OpenOrdersContainer } from "pages/trades/binance-trade-page/trading/trading-tables/open-orders/open-orders.container";
import { OrderHistoryContainer } from "pages/trades/binance-trade-page/trading/trading-tables/order-history/order-history.container";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./trading-tables.module.scss";

enum TABS {
  OPEN_ORDERS = "OPEN_ORDERS",
  ORDER_HISTORY = "ORDER_HISTORY",
  TRADE_HISTORY = "TRADE_HISTORY",
  FUNDS = "FUNDS"
}

interface Props {}

const _TradingTables: React.FC<Props> = () => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_ORDERS);
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
          <GVTab value={TABS.ORDER_HISTORY} label={t("Order history")} />
          <GVTab value={TABS.TRADE_HISTORY} label={t("Trade history")} />
          <GVTab value={TABS.FUNDS} label={t("Funds")} />
        </GVTabs>
      </DefaultBlock>
      <div className={styles["trading-tables__tables-container"]}>
        {tab === TABS.OPEN_ORDERS && <OpenOrdersContainer />}
        {tab === TABS.ORDER_HISTORY && <OrderHistoryContainer />}
      </div>
    </DefaultBlock>
  );
};

export const TradingTables = React.memo(_TradingTables);
