import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const dashboardFundsSelector = state => state.dashboard.funds;
const dashboardFundsTableSelector = tableSelectorCreator(
  dashboardFundsSelector,
  "funds"
);

export default dashboardFundsTableSelector;
