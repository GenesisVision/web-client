import { DefaultBlock } from "components/default.block/default.block";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { SIZES } from "constants/constants";
import useTab from "hooks/tab.hook";
import { OpenOrdersContainer } from "pages/trades/binance-trade-page/trading/trading-tables/open-orders/open-orders.container";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./trading-tables.module.scss";

enum TABS {
  OPEN_ORDERS = "OPEN_ORDERS",
  ORDERS_HISTORY = "ORDERS_HISTORY",
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
          <GVTab value={TABS.ORDERS_HISTORY} label={t("Orders history")} />
          <GVTab value={TABS.TRADE_HISTORY} label={t("Trade history")} />
          <GVTab value={TABS.FUNDS} label={t("Funds")} />
        </GVTabs>
      </DefaultBlock>
      {tab === TABS.OPEN_ORDERS && <OpenOrdersContainer />}
    </DefaultBlock>
  );
};

export const TradingTables = React.memo(_TradingTables);
