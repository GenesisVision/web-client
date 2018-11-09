import authService from "services/auth-service";

import { DEFAULT_PERIOD } from "../../../components/chart/chart-period/chart-period.helpers";
import { fundsApiProxy } from "../../../services/api-client/funds-api";
import { programsApiProxy } from "../../../services/api-client/programs-api";
import * as actions from "../actions/dashboard.actions";

export const getPortfolioEvents = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  dispatch(actions.fetchPortfolioEvents(authorization, { take: 5 }));
};

export const getAssetChart = (
  assetId,
  assetTitle,
  assetType,
  period = DEFAULT_PERIOD
) => (dispatch, getState) => {
  const { currency } = getState().accountSettings;
  const chartFilter = {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };

  dispatch(actions.dashboardChart({ isPending: true }));
  if (assetType === "Program") {
    programsApiProxy
      .v10ProgramsByIdChartsProfitGet(assetId, chartFilter)
      .then(({ data }) => {
        dispatch(
          actions.dashboardChart({
            type: assetType,
            id: assetId,
            title: assetTitle,
            pnLChart: data.pnLChart,
            equityChart: data.equityChart
          })
        );
      });
  } else {
    fundsApiProxy
      .v10FundsByIdChartsProfitGet(assetId, chartFilter)
      .then(({ data }) => {
        dispatch(
          actions.dashboardChart({
            type: assetType,
            id: assetId,
            title: assetTitle,
            equityChart: data.equityChart
          })
        );
      });
  }
};
