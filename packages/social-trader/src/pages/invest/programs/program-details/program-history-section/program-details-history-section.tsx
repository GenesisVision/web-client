import { DefaultTableBlock } from "components/default.block/default-table.block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { TRADE_ASSET_TYPE } from "constants/constants";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useTab from "hooks/tab.hook";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { CurrencyEnum } from "utils/types";

const ProgramAnalytics = dynamic(() =>
  import("./program-analytics/program-analytics")
);
const ProgramFinancialStatistic = dynamic(() =>
  import("./program-financial-statistic/program-financial-statistic")
);
const ProgramOpenPositions = dynamic(() =>
  import("./program-open-positions/program-open-positions")
);

const ProgramPeriodHistory = dynamic(() =>
  import("./program-period-history/program-period-history")
);
const ProgramSubscriptions = dynamic(() =>
  import("./program-subscriptions/program-subscriptions")
);
const ProgramTrades = dynamic(() => import("./program-trades/program-trades"));
const ProgramTradingLog = dynamic(() =>
  import("./program-trading-log/program-trading-log")
);

enum TABS {
  ANALYTICS = "analytics",
  TRADING_LOG = "tradingLog",
  TRADES = "trades",
  OPEN_POSITIONS = "openPositions",
  SUBSCRIBERS = "subscribers",
  FINANCIAL_STATISTIC = "financialStatistic",
  PERIOD_HISTORY = "periodHistory"
}

interface Props {
  isProgram?: boolean;
  isExchange?: boolean;
  isFollower?: boolean;
  canCloseOpenPositions?: boolean;
  assetType: TRADE_ASSET_TYPE;
  haveDelay?: boolean;
  getHistoryCounts: (
    id: string
  ) => (dispatch: Dispatch, getState: () => RootState) => void;
  tablesData: TProgramTablesData;
  showCommissionRebateSometime: boolean;
  showSwaps: boolean;
  showTickets: boolean;
  programId: string;
  programCurrency: CurrencyEnum;
  isOwnProgram: boolean;
  title: string;
}

export type TProgramTableReduxData = {
  getItems: (id: string) => GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  itemSelector?: (state: RootState) => { [keys: string]: any };
};

export type TProgramTablesData = {
  tradingLog?: TProgramTableReduxData;
  trades: TProgramTableReduxData;
  openPositions: TProgramTableReduxData;
  subscriptions?: TProgramTableReduxData;
  financialStatistic?: TProgramTableReduxData;
  periodHistory?: TProgramTableReduxData;
};

const nullSelector = () => ({
  itemsData: { data: { total: 0 } }
});

const _ProgramDetailsHistorySection: React.FC<Props> = ({
  isProgram = true,
  isExchange,
  isFollower,
  canCloseOpenPositions,
  assetType,
  haveDelay = true,
  getHistoryCounts,
  tablesData: {
    tradingLog,
    financialStatistic,
    openPositions,
    periodHistory,
    subscriptions,
    trades
  },
  showCommissionRebateSometime,
  programId,
  showSwaps,
  showTickets,
  programCurrency,
  isOwnProgram,
  title
}) => {
  const currency = useAccountCurrency();
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_POSITIONS);
  const dispatch = useDispatch();
  const tradingLogCount = useSelector(
    tradingLog ? tradingLog.dataSelector : nullSelector
  ).itemsData.data.total;
  const openPositionsCount = useSelector(openPositions.dataSelector).itemsData
    .data.total;
  const periodHistoryCount = useSelector(
    periodHistory ? periodHistory.dataSelector : nullSelector
  ).itemsData.data.total;
  const subscriptionsCount = useSelector(
    subscriptions ? subscriptions.dataSelector : nullSelector
  ).itemsData.data.total;
  const financialStatisticCount = useSelector(
    financialStatistic ? financialStatistic.dataSelector : nullSelector
  ).itemsData.data.total;
  const tradesCount = useSelector(trades.dataSelector).itemsData.data.total;

  useEffect(() => {
    programId && dispatch(getHistoryCounts(programId));
  }, [dispatch, programId]);

  return (
    <DefaultTableBlock>
      <DetailsBlockTabs value={tab} onChange={setTab}>
        <GVTab
          value={TABS.OPEN_POSITIONS}
          label={t("program-details-page:history.tabs.open-positions")}
          count={openPositionsCount}
        />
        <GVTab
          value={TABS.TRADES}
          label={t("program-details-page:history.tabs.trades")}
          count={tradesCount}
        />
        <GVTab
          visible={!!isExchange && !!periodHistory && isProgram}
          value={TABS.ANALYTICS}
          label={t("program-details-page:history.tabs.analytics")}
          count={periodHistoryCount}
        />
        <GVTab
          visible={!isExchange && !!periodHistory}
          value={TABS.PERIOD_HISTORY}
          label={t("program-details-page:history.tabs.period-history")}
          count={periodHistoryCount}
        />
        <GVTab
          value={TABS.SUBSCRIBERS}
          label={t("program-details-page:history.tabs.subscriptions")}
          count={subscriptionsCount}
          visible={
            !isExchange && isAuthenticated && isOwnProgram && !!subscriptions
          }
        />
        <GVTab
          value={TABS.FINANCIAL_STATISTIC}
          label={t("program-details-page:history.tabs.financial-statistic")}
          count={financialStatisticCount}
          visible={isAuthenticated && isOwnProgram && !!financialStatistic}
        />
        <GVTab
          value={TABS.TRADING_LOG}
          label={t("program-details-page:history.tabs.trading-log")}
          count={tradingLogCount}
          visible={!!isAuthenticated && !!isFollower && !!tradingLog}
        />
      </DetailsBlockTabs>
      {tab === TABS.TRADING_LOG && tradingLog && (
        <ProgramTradingLog
          getItems={tradingLog.getItems(programId)}
          dataSelector={tradingLog.dataSelector}
        />
      )}
      {tab === TABS.TRADES && (
        <ProgramTrades
          itemSelector={trades.itemSelector!}
          title={title}
          assetType={assetType}
          haveDelay={haveDelay}
          getItems={trades.getItems(programId)}
          dataSelector={trades.dataSelector}
          showSwaps={showSwaps}
          showTickets={showTickets}
          programId={programId}
        />
      )}
      {tab === TABS.OPEN_POSITIONS && (
        <ProgramOpenPositions
          isExchange={isExchange}
          assetType={assetType}
          canCloseOpenPositions={canCloseOpenPositions}
          itemSelector={openPositions.itemSelector!}
          getItems={openPositions.getItems(programId)}
          dataSelector={openPositions.dataSelector}
          programId={programId}
          currency={programCurrency}
        />
      )}
      {tab === TABS.SUBSCRIBERS && subscriptions && (
        <ProgramSubscriptions
          getItems={subscriptions.getItems(programId)}
          dataSelector={subscriptions.dataSelector}
          id={programId}
          currency={currency}
        />
      )}
      {tab === TABS.FINANCIAL_STATISTIC && financialStatistic && (
        <ProgramFinancialStatistic
          isExchange={isExchange}
          assetType={assetType}
          getItems={financialStatistic.getItems(programId)}
          dataSelector={financialStatistic.dataSelector}
          showCommissionRebateSometime={showCommissionRebateSometime}
          id={programId}
          currency={programCurrency}
          title={title}
        />
      )}
      {tab === TABS.PERIOD_HISTORY && periodHistory && (
        <ProgramPeriodHistory
          assetType={assetType}
          getItems={periodHistory.getItems(programId)}
          dataSelector={periodHistory.dataSelector}
          id={programId}
          currency={programCurrency}
        />
      )}
      {tab === TABS.ANALYTICS && periodHistory && (
        <ProgramAnalytics
          title={title}
          getItems={periodHistory.getItems(programId)}
          dataSelector={periodHistory.dataSelector}
          id={programId}
          currency={programCurrency}
        />
      )}
    </DefaultTableBlock>
  );
};

const ProgramDetailsHistorySection = React.memo(_ProgramDetailsHistorySection);
export default ProgramDetailsHistorySection;
