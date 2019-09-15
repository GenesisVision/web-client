import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DetailsBlock from "shared/components/details/details-block";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { ROLE } from "shared/constants/constants";
import useTab from "shared/hooks/tab.hook";
import useRole from "shared/hooks/use-role.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { CurrencyEnum } from "shared/utils/types";

import {
  financialStatisticTableSelector,
  openPositionsTableSelector,
  periodHistoryTableSelector,
  subscriptionsTableSelector,
  tradesTableSelector
} from "../reducers/program-history.reducer";
import { getProgramHistoryCounts } from "../services/program-details.service";
import ProgramFinancialStatistic from "./program-financial-statistic/program-financial-statistic";
import ProgramOpenPositions from "./program-open-positions/program-open-positions";
import ProgramPeriodHistory from "./program-period-history/program-period-history";
import ProgramSubscriptions from "./program-subscriptions/program-subscriptions";
import ProgramTrades from "./program-trades/program-trades";

const _ProgramDetailsHistorySection: React.FC<Props> = ({
  showCommissionRebateSometime,
  programId,
  showSwaps,
  showTickets,
  programCurrency,
  isSignalProgram,
  isOwnProgram,
  title
}) => {
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  const role = useRole();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_POSITIONS);

  const dispatch = useDispatch();
  const openPositionsCount = useSelector(openPositionsTableSelector).itemsData
    .data.total;
  const periodHistoryCount = useSelector(periodHistoryTableSelector).itemsData
    .data.total;
  const subscriptionsCount = useSelector(subscriptionsTableSelector).itemsData
    .data.total;
  const financialStatisticCount = useSelector(financialStatisticTableSelector)
    .itemsData.data.total;
  const tradesCount = useSelector(tradesTableSelector).itemsData.data.total;

  useEffect(
    () => {
      dispatch(getProgramHistoryCounts(programId));
    },
    [programId]
  );

  const isManager = role === ROLE.MANAGER;
  return (
    <DetailsBlock table>
      <div className="details-history__header">
        <div className="details-history__tabs">
          <GVTabs value={tab} onChange={setTab}>
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
              value={TABS.PERIOD_HISTORY}
              label={t("program-details-page.history.tabs.period-history")}
              count={periodHistoryCount}
            />
            <GVTab
              value={TABS.SUBSCRIBERS}
              label={t("program-details-page.history.tabs.subscriptions")}
              count={subscriptionsCount}
              visible={isAuthenticated && isSignalProgram && isOwnProgram}
            />
            <GVTab
              value={TABS.FINANCIAL_STATISTIC}
              label={t("program-details-page.history.tabs.financial-statistic")}
              count={financialStatisticCount}
              visible={isAuthenticated && isManager && isOwnProgram}
            />
          </GVTabs>
        </div>
      </div>
      {tab === TABS.TRADES && (
        <ProgramTrades
          showSwaps={showSwaps}
          showTickets={showTickets}
          programId={programId}
        />
      )}
      {tab === TABS.OPEN_POSITIONS && (
        <ProgramOpenPositions
          programId={programId}
          currency={programCurrency}
        />
      )}
      {tab === TABS.SUBSCRIBERS && (
        <ProgramSubscriptions id={programId} currency={currency} />
      )}
      {tab === TABS.FINANCIAL_STATISTIC && (
        <ProgramFinancialStatistic
          showCommissionRebateSometime={showCommissionRebateSometime}
          id={programId}
          currency={programCurrency}
          title={title}
        />
      )}
      {tab === TABS.PERIOD_HISTORY && (
        <ProgramPeriodHistory id={programId} currency={programCurrency} />
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
  showCommissionRebateSometime: boolean;
  isSignalProgram: boolean;
  showSwaps: boolean;
  showTickets: boolean;
  programId: string;
  programCurrency: CurrencyEnum;
  isOwnProgram: boolean;
  title: string;
}

const ProgramDetailsHistorySection = React.memo(_ProgramDetailsHistorySection);
export default ProgramDetailsHistorySection;
