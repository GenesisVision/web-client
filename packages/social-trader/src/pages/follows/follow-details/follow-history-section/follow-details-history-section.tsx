import "components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import DetailsBlock from "components/details/details-block";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import useTab from "hooks/tab.hook";
import ProgramOpenPositions from "pages/programs/program-details/program-history-section/program-open-positions/program-open-positions";
import ProgramSubscriptions from "pages/programs/program-details/program-history-section/program-subscriptions/program-subscriptions";
import ProgramTrades from "pages/programs/program-details/program-history-section/program-trades/program-trades";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { CurrencyEnum } from "utils/types";

import {
  openPositionsTableSelector,
  subscriptionsTableSelector,
  tradesTableSelector
} from "../reducers/follow-history.reducer";
import {
  getFollowHistoryCounts,
  getOpenPositions,
  getSubscriptions,
  getTrades
} from "../services/follow-details.service";

const _FollowDetailsHistorySection: React.FC<Props> = ({
  showCommissionRebateSometime,
  id,
  showSwaps,
  showTickets,
  programCurrency,
  isSignalProgram,
  isOwnProgram
}) => {
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_POSITIONS);

  const dispatch = useDispatch();
  const openPositionsCount = useSelector(openPositionsTableSelector).itemsData
    .data.total;
  const subscriptionsCount = useSelector(subscriptionsTableSelector).itemsData
    .data.total;
  const tradesCount = useSelector(tradesTableSelector).itemsData.data.total;

  useEffect(() => {
    id && dispatch(getFollowHistoryCounts(id));
  }, [dispatch, id]);

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
              value={TABS.SUBSCRIBERS}
              label={t("program-details-page.history.tabs.subscriptions")}
              count={subscriptionsCount}
              visible={isAuthenticated && isSignalProgram && isOwnProgram}
            />
          </GVTabs>
        </div>
      </div>
      {tab === TABS.TRADES && (
        <ProgramTrades
          getItems={getTrades(id)}
          dataSelector={tradesTableSelector}
          showSwaps={showSwaps}
          showTickets={showTickets}
          programId={id}
        />
      )}
      {tab === TABS.OPEN_POSITIONS && (
        <ProgramOpenPositions
          getItems={getOpenPositions(id)}
          dataSelector={openPositionsTableSelector}
          programId={id}
          currency={programCurrency}
        />
      )}
      {tab === TABS.SUBSCRIBERS && (
        <ProgramSubscriptions
          getItems={getSubscriptions(id)}
          dataSelector={subscriptionsTableSelector}
          id={id}
          currency={currency}
        />
      )}
    </DetailsBlock>
  );
};

enum TABS {
  TRADES = "trades",
  OPEN_POSITIONS = "openPositions",
  SUBSCRIBERS = "subscribers"
}

interface Props {
  showCommissionRebateSometime: boolean;
  isSignalProgram: boolean;
  showSwaps: boolean;
  showTickets: boolean;
  id: string;
  programCurrency: CurrencyEnum;
  isOwnProgram: boolean;
}

const FollowDetailsHistorySection = React.memo(_FollowDetailsHistorySection);
export default FollowDetailsHistorySection;
