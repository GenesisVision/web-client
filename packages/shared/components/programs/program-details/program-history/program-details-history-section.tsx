import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import React, { useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import ProgramTrades from "shared/components/programs/program-details/program-history/program-trades";
import Surface from "shared/components/surface/surface";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { IDataModel, ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import useTab from "shared/hooks/tab.hook";
import {
  AuthState,
  isAuthenticatedSelector
} from "shared/reducers/auth-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { HistoryCountsType } from "../program-details.types";
import ProgramFinancialStatistic from "./program-financial-statistic/program-financial-statistic";
import ProgramOpenPositions from "./program-open-positions";
import ProgramPeriodHistory from "./program-period-history";
import ProgramSubscriptions from "./program-subscriptions/program-subscriptions";

const _ProgramDetailsHistorySection: React.FC<Props> = ({
  showCommissionRebateSometime,
  programId,
  fetchHistoryCounts,
  showSwaps,
  showTickets,
  t,
  programCurrency,
  currency,
  isAuthenticated,
  isInvested,
  fetchTrades,
  fetchOpenPositions,
  fetchPeriodHistory,
  isSignalProgram,
  isOwnProgram,
  role,
  title
}) => {
  const [counts, setCounts] = useState<HistoryCountsType>({});
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_POSITIONS);
  useEffect(() => {
    fetchHistoryCounts(programId).then(setCounts);
  }, []);
  const {
    openPositionsCount,
    periodHistoryCount,
    subscriptionsCount,
    tradesCount
  } = counts;
  const isManager = role === ROLE.MANAGER;
  return (
    <Surface className="details-history">
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
              count={periodHistoryCount}
              visible={isAuthenticated && isManager && isOwnProgram}
            />
          </GVTabs>
        </div>
      </div>
      <div>
        {tab === TABS.TRADES && (
          <ProgramTrades
            showSwaps={showSwaps}
            showTickets={showTickets}
            fetchTrades={fetchTrades}
            programId={programId}
            currency={currency}
          />
        )}
        {tab === TABS.OPEN_POSITIONS && (
          <ProgramOpenPositions
            fetchOpenPositions={fetchOpenPositions}
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
            fetchFinancialStatistic={fetchPeriodHistory}
            title={title}
          />
        )}
        {tab === TABS.PERIOD_HISTORY && (
          <ProgramPeriodHistory
            id={programId}
            currency={programCurrency}
            fetchPeriodHistory={fetchPeriodHistory}
          />
        )}
      </div>
    </Surface>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  isAuthenticated: isAuthenticatedSelector(state)
});

enum TABS {
  TRADES = "trades",
  OPEN_POSITIONS = "openPositions",
  SUBSCRIBERS = "subscribers",
  FINANCIAL_STATISTIC = "financialStatistic",
  PERIOD_HISTORY = "periodHistory"
}

interface Props extends OwnProps, StateProps, WithTranslation, WithRoleProps {}

interface OwnProps {
  showCommissionRebateSometime: boolean;
  isSignalProgram: boolean;
  showSwaps: boolean;
  showTickets: boolean;
  fetchHistoryCounts: (id: string) => Promise<HistoryCountsType>;
  fetchOpenPositions: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
  fetchTrades: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
  fetchPeriodHistory: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
  programId: string;
  currency: CurrencyEnum;
  programCurrency: CurrencyEnum;
  isInvested: boolean;
  isOwnProgram: boolean;
  title: string;
}

interface StateProps extends AuthState {}

const ProgramDetailsHistorySection = compose<React.ComponentType<OwnProps>>(
  withRole,
  translate(),
  connect(mapStateToProps),
  React.memo
)(_ProgramDetailsHistorySection);
export default ProgramDetailsHistorySection;
