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
import { ProgramHistoryContext } from "pages/invest/programs/program-details/program-history-section/program-details-history-context";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { RootState } from "reducers/root-reducer";
import { CurrencyEnum } from "utils/types";

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
const ProgramTrades = dynamic(() =>
  import("./program-trades/program-simple-trades")
);
const ProgramTradingLog = dynamic(() =>
  import("./program-trading-log/program-trading-log")
);

enum TABS {
  TRADING_LOG = "tradingLog",
  TRADES = "trades",
  OPEN_POSITIONS = "openPositions",
  SUBSCRIBERS = "subscribers",
  FINANCIAL_STATISTIC = "financialStatistic",
  PERIOD_HISTORY = "periodHistory"
}

interface Props {
  isFollower?: boolean;
  canCloseOpenPositions?: boolean;
  assetType: TRADE_ASSET_TYPE;
  haveDelay?: boolean;
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

const _ProgramDetailsSimpleHistorySection: React.FC<Props> = ({
  isFollower,
  canCloseOpenPositions,
  assetType,
  haveDelay = true,
  tablesData: {
    tradingLog,
    financialStatistic,
    openPositions,
    periodHistory,
    subscriptions
  },
  showCommissionRebateSometime,
  programId,
  showSwaps,
  showTickets,
  programCurrency,
  isOwnProgram,
  title
}) => {
  const { counts } = useContext(ProgramHistoryContext);
  const currency = useAccountCurrency();
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_POSITIONS);

  return (
    <DefaultTableBlock>
      <DetailsBlockTabs value={tab} onChange={setTab}>
        <GVTab
          value={TABS.OPEN_POSITIONS}
          label={t("program-details-page:history.tabs.open-positions")}
          count={counts.openPositions}
        />
        <GVTab
          value={TABS.TRADES}
          label={t("program-details-page:history.tabs.trades")}
          count={counts.trades}
        />
        <GVTab
          visible={!!periodHistory}
          value={TABS.PERIOD_HISTORY}
          label={t("program-details-page:history.tabs.period-history")}
          count={counts.periods}
        />
        <GVTab
          value={TABS.SUBSCRIBERS}
          label={t("program-details-page:history.tabs.subscriptions")}
          count={counts.subscriptions}
          visible={isAuthenticated && isOwnProgram && !!subscriptions}
        />
        <GVTab
          value={TABS.FINANCIAL_STATISTIC}
          label={t("program-details-page:history.tabs.financial-statistic")}
          count={counts.financialStatistic}
          visible={isAuthenticated && isOwnProgram && !!financialStatistic}
        />
        <GVTab
          value={TABS.TRADING_LOG}
          label={t("program-details-page:history.tabs.trading-log")}
          count={counts.tradingLog}
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
          title={title}
          assetType={assetType}
          haveDelay={haveDelay}
          showSwaps={showSwaps}
          showTickets={showTickets}
          programId={programId}
        />
      )}
      {tab === TABS.OPEN_POSITIONS && (
        <ProgramOpenPositions
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
          getItems={periodHistory.getItems(programId)}
          dataSelector={periodHistory.dataSelector}
          id={programId}
          currency={programCurrency}
        />
      )}
    </DefaultTableBlock>
  );
};

const ProgramDetailsSimpleHistorySection = React.memo(
  _ProgramDetailsSimpleHistorySection
);
export default ProgramDetailsSimpleHistorySection;
