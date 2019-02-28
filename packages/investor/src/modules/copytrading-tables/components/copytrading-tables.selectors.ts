import { InvestorRootState } from "reducers";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const copytradingOpenTradesSelector = (state: InvestorRootState) =>
  state.copytradingTables.openTrades;
export const dashboardOpenTradesTableSelector = tableSelectorCreator(
  copytradingOpenTradesSelector,
  "trades"
);

const copytradingTradesHistorySelector = (state: InvestorRootState) =>
  state.copytradingTables.tradesHistory;
export const dashboardTradesHistoryTableSelector = tableSelectorCreator(
  copytradingTradesHistorySelector,
  "trades"
);
