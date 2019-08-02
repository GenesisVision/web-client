import "shared/components/dashboard/dashboard-assets/dashboard-assets.scss";

import React, { useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import useTab from "shared/hooks/tab.hook";

import {
  fetchCopytradingTradesCount,
  ICopytradingTradesCounts
} from "../services/copytrading-tables.service";
import OpenTradesTable from "./open-trades-table";
import TradesHistoryTable from "./trades-history-table";
import TradesLogTable from "./trades-log-table";

const _CopytradingTablesSection: React.FC<Props> = ({ t, title, currency }) => {
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_TRADES);
  const [counts, setCounts] = useState<ICopytradingTradesCounts>({});
  useEffect(
    () => {
      fetchCopytradingTradesCount(currency).then(setCounts);
    },
    [currency]
  );
  const { openTradesCount, logCount, historyCount } = counts;
  return (
    <Surface>
      <div className="dashboard-assets__head">
        <h3>{t("investor.copytrading-tables.title")}</h3>
        <div className="dashboard-assets__tabs">
          <GVTabs value={tab} onChange={setTab}>
            <GVTab
              value={TABS.OPEN_TRADES}
              label={t("investor.copytrading-tables.open-trades")}
              count={openTradesCount}
            />
            <GVTab
              value={TABS.HISTORY}
              label={t("investor.copytrading-tables.history")}
              count={historyCount}
            />
            <GVTab
              value={TABS.LOG}
              label={t("investor.copytrading-tables.log")}
              count={logCount}
            />
          </GVTabs>
        </div>
      </div>
      {tab === TABS.OPEN_TRADES && (
        <OpenTradesTable title={title} currency={currency} />
      )}
      {tab === TABS.HISTORY && (
        <TradesHistoryTable title={title} currency={currency} />
      )}
      {tab === TABS.LOG && <TradesLogTable currency={currency} />}
    </Surface>
  );
};

enum TABS {
  LOG = "LOG",
  OPEN_TRADES = "OPEN_TRADES",
  HISTORY = "HISTORY"
}

interface Props extends WithTranslation {
  title: string;
  currency?: string;
}

const CopytradingTablesSection = translate()(
  React.memo(_CopytradingTablesSection)
);
export default CopytradingTablesSection;
