import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect, ResolveThunks, useDispatch, useSelector } from "react-redux";
import { InvestorRootState } from "reducers";
import {
  Action,
  ActionCreatorsMapObject,
  bindActionCreators,
  Dispatch
} from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import useTab from "shared/hooks/tab.hook";

import { clearCopytradingTable } from "../actions/copytrading-tables.actions";
import {
  getCopytradingTradesCount,
  ICopytradingTradesCounts
} from "../services/copytrading-tables.service";
import {
  dashboardOpenTradesTableSelector,
  dashboardTradesHistoryTableSelector,
  dashboardTradesLogTableSelector
} from "./copytrading-tables.selectors";
import OpenTradesTable from "./open-trades-table";
import TradesHistoryTable from "./trades-history-table";
import TradesLogTable from "./trades-log-table";

const _CopytradingTablesSection: React.FC<Props> = ({
  title,
  service,
  currency
}) => {
  const dispatch = useDispatch();
  const openTradesCount = useSelector(dashboardOpenTradesTableSelector)
    .itemsData.data.total;
  const logCount = useSelector(dashboardTradesLogTableSelector).itemsData.data
    .total;
  const historyCount = useSelector(dashboardTradesHistoryTableSelector)
    .itemsData.data.total;
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_TRADES);
  useEffect(() => {
    service.getCopytradingTradesCount(currency);
    return () => {
      dispatch(clearCopytradingTable());
    };
  }, [currency, service]);
  return (
    <>
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
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      getCopytradingTradesCount
    },
    dispatch
  )
});

const CopytradingTablesSection = connect(
  null,
  mapDispatchToProps
)(_CopytradingTablesSection);

export default CopytradingTablesSection;

enum TABS {
  LOG = "LOG",
  OPEN_TRADES = "OPEN_TRADES",
  HISTORY = "HISTORY"
}

interface ServiceThunks extends ActionCreatorsMapObject {
  getCopytradingTradesCount: typeof getCopytradingTradesCount;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends DispatchProps {
  title: string;
  currency?: string;
}
