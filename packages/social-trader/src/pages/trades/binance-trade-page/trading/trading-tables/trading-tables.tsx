import { DefaultTableBlock } from "components/default.block/default-table.block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import useTab from "hooks/tab.hook";
import { OpenOrdersContainer } from "pages/trades/binance-trade-page/trading/trading-tables/open-orders/open-orders.container";
import React from "react";
import { useTranslation } from "react-i18next";

enum TABS {
  OPEN_ORDERS = "OPEN_ORDERS",
  FUNDS = "FUNDS"
}

interface Props {}

const _TradingTables: React.FC<Props> = () => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_ORDERS);
  return (
    <DefaultTableBlock solid>
      <DetailsBlockTabs value={tab} onChange={setTab}>
        <GVTab value={TABS.OPEN_ORDERS} label={t("Open orders")} />
        <GVTab value={TABS.FUNDS} label={t("Funds")} />
      </DetailsBlockTabs>
      {tab === TABS.OPEN_ORDERS && <OpenOrdersContainer />}
    </DefaultTableBlock>
  );
};

export const TradingTables = React.memo(_TradingTables);
