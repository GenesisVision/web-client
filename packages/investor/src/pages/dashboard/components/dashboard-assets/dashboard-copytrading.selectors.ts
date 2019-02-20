import { InvestorRootState } from "reducers";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const dashboardCopytradingSelector = (state: InvestorRootState) =>
  state.dashboard.copytrading;
export const dashboardCopytradingTableSelector = tableSelectorCreator(
  dashboardCopytradingSelector,
  "programs"
);
