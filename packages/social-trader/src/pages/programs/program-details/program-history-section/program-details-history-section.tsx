import "components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import DetailsBlock from "components/details/details-block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import useTab from "hooks/tab.hook";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { CREATE_ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "utils/types";

import ProgramFinancialStatistic from "./program-financial-statistic/program-financial-statistic";
import ProgramOpenPositions from "./program-open-positions/program-open-positions";
import ProgramPeriodHistory from "./program-period-history/program-period-history";
import ProgramSubscriptions from "./program-subscriptions/program-subscriptions";
import ProgramTrades from "./program-trades/program-trades";

const nullSelector = () => ({
  itemsData: { data: { total: 0 } }
});

const _ProgramDetailsHistorySection: React.FC<Props> = ({
  assetType,
  haveDelay = true,
  getHistoryCounts,
  tablesData: {
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
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_POSITIONS);
  const dispatch = useDispatch();
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
    <DetailsBlock table>
      <DetailsBlockTabs value={tab} onChange={setTab}>
        <GVTab
          value={TABS.OPEN_POSITIONS}
          label={t("program-details-page.history.tabs.open-positions")}
          count={openPositionsCount}
        />
        <GVTab
          value={TABS.TRADES}
          label={t("program-details-page.history.tabs.trades")}
          count={tradesCount}
        />
        <GVTab
          visible={!!periodHistory}
          value={TABS.PERIOD_HISTORY}
          label={t("program-details-page.history.tabs.period-history")}
          count={periodHistoryCount}
        />
        <GVTab
          value={TABS.SUBSCRIBERS}
          label={t("program-details-page.history.tabs.subscriptions")}
          count={subscriptionsCount}
          visible={isAuthenticated && isOwnProgram && !!subscriptions}
        />
        <GVTab
          value={TABS.FINANCIAL_STATISTIC}
          label={t("program-details-page.history.tabs.financial-statistic")}
          count={financialStatisticCount}
          visible={isAuthenticated && isOwnProgram && !!financialStatistic}
        />
      </DetailsBlockTabs>
      {tab === TABS.TRADES && (
        <ProgramTrades
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
    </DetailsBlock>
  );
};

enum TABS {
  TRADES = "trades",
  OPEN_POSITIONS = "openPositions",
  SUBSCRIBERS = "subscribers",
  FINANCIAL_STATISTIC = "financialStatistic",
  PERIOD_HISTORY = "periodHistory"
}

interface Props {
  assetType?: CREATE_ASSET;
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
};

export type TProgramTablesData = {
  trades: TProgramTableReduxData;
  openPositions: TProgramTableReduxData;
  subscriptions?: TProgramTableReduxData;
  financialStatistic?: TProgramTableReduxData;
  periodHistory?: TProgramTableReduxData;
};

const ProgramDetailsHistorySection = React.memo(_ProgramDetailsHistorySection);
export default ProgramDetailsHistorySection;
