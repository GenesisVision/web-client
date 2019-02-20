import { InvestorRootState } from "reducers";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const dashboardOpenTradesSelector = (state: InvestorRootState) =>
  state.dashboard.openTrades;
export const dashboardOpenTradesTableSelector = tableSelectorCreator(
  dashboardOpenTradesSelector,
  "trades"
);

const dashboardTradesHistorySelector = (state: InvestorRootState) =>
  state.dashboard.tradesHistory;
export const dashboardTradesHistoryTableSelector = tableSelectorCreator(
  dashboardTradesHistorySelector,
  "trades"
);
