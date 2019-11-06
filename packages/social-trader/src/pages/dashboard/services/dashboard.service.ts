import { CancelablePromise, InvestmentEventViewModels } from "gv-api-web";
import { NextPageContext } from "next";
import {
  assetsLoaderData,
  getInvestingStatisticLoaderData,
  getRecommendationLoaderData,
  getTradingLoaderData,
  getTradingPublicLoaderData,
  portfolioLoaderData
} from "pages/dashboard/dashboard.loaders-data";
import {
  TAssets,
  TDashboardInvestingStatistic,
  TDashboardTotal,
  TDashboardTradingStatistic,
  TPortfolio,
  TRecommendation,
  TTrading
} from "pages/dashboard/dashboard.types";
import { ManagerRootState } from "reducers";
import { Dispatch } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import dashboardFundsTableSelector from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds.selector";
import { EVENT_LOCATION } from "shared/components/programs/program-details/services/program-details.service";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "shared/components/table/services/table.service";
import { IDataModel } from "shared/constants/constants";
import dashboardApi from "shared/services/api-client/dashboard-api";
import fundsApi from "shared/services/api-client/funds-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import { tableLoaderCreator } from "shared/utils/helpers";
import { ActionType, CurrencyEnum } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";
import { fetchEventsAction } from "../actions/dashboard.actions";
import { getDashboardFunds } from "./dashboard-funds.service";

export const getFollowThem = (): CancelablePromise<IDataModel> =>
  (Promise.resolve(
    getTradingPublicLoaderData()
  ) as unknown) as CancelablePromise<IDataModel>;

export const getPrivateAssets = (): CancelablePromise<IDataModel> =>
  (Promise.resolve(
    getTradingPublicLoaderData()
  ) as unknown) as CancelablePromise<IDataModel>;

export const getPublicAssets = (): CancelablePromise<IDataModel> =>
  (Promise.resolve(
    getTradingPublicLoaderData()
  ) as unknown) as CancelablePromise<IDataModel>;

export const getTradingData = (): CancelablePromise<TTrading> =>
  (Promise.resolve(getTradingLoaderData()) as unknown) as CancelablePromise<
    TTrading
  >;

export const getPortfolio = (): CancelablePromise<TPortfolio> =>
  (Promise.resolve(portfolioLoaderData()) as unknown) as CancelablePromise<
    TPortfolio
  >;

export const getAssetsPercents = (): CancelablePromise<TAssets> =>
  (Promise.resolve(assetsLoaderData()) as unknown) as CancelablePromise<
    TAssets
  >;

export const getRecommendations = (): CancelablePromise<TRecommendation[]> =>
  (Promise.resolve(
    tableLoaderCreator(getRecommendationLoaderData, 15)
  ) as unknown) as CancelablePromise<TRecommendation[]>;

export const getTotal = ({
  currency
}: {
  currency: CurrencyEnum;
}): CancelablePromise<TDashboardTotal> =>
  dashboardApi.getSummary(authService.getAuthArg(), { currency });

export const getTotalTradingStatistic = ({
  currency
}: {
  currency: CurrencyEnum;
}): CancelablePromise<TDashboardTradingStatistic> =>
  dashboardApi.getTradingDetails(authService.getAuthArg(), { currency });

export const getTotalInvestingStatistic = ({
  currency
}: {
  currency: CurrencyEnum;
}): CancelablePromise<TDashboardInvestingStatistic> =>
  dashboardApi.getInvestingDetails(authService.getAuthArg(), {
    currency
  });

export const getEvents = (eventLocation: EVENT_LOCATION) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> =>
  fetchEventsAction(filters, eventLocation);

export const getPortfolioEvents = (dispatch: Dispatch) =>
  dispatch(
    actions.fetchPortfolioEventsAction(authService.getAuthArg(), {
      eventLocation: EVENT_LOCATION.Dashboard,
      take: 5
    })
  );

export const getAssetChart = (
  assetId: string,
  assetTitle: string,
  assetType: ASSETS_TYPES,
  period: ChartDefaultPeriod
) => (dispatch: Dispatch) => {
  const chartFilter = {
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };

  if (assetType === ASSETS_TYPES.Program) {
    //TODO удалить if, отрефакторить
    programsApi.getProgramProfitChart(assetId, chartFilter).then(data => {
      dispatch(
        actions.dashboardChartAction({
          type: assetType,
          id: assetId,
          title: assetTitle,
          currency: data.charts[0].currency,
          pnLChart: [],
          equityChart: data.charts
        })
      );
    });
  } else {
    fundsApi.getFundProfitChart(assetId, chartFilter).then(data => {
      dispatch(
        actions.dashboardChartAction({
          type: assetType,
          id: assetId,
          title: assetTitle,
          equityChart: data.charts
        })
      );
    });
  }
};

export const getAssets = (ctx?: NextPageContext) => async (
  dispatch: Dispatch
) => await dispatch(actions.fetchAssetsAction(authService.getAuthArg(ctx)));

export const setPeriod = (period: ChartDefaultPeriod) => (dispatch: Dispatch) =>
  dispatch(actions.setPeriodAction(period));

export const getAssetsCounts = () => (
  dispatch: Dispatch,
  getState: () => ManagerRootState
) => {
  const commonFiltering = { take: 0 };

  const fundsCountFilters = composeRequestFiltersByTableState(
    dashboardFundsTableSelector(getState())
  );
  dispatch(getDashboardFunds({ ...fundsCountFilters, ...commonFiltering }));
};

export type TChartAsset = any; //ManagerSimpleProgram | ManagerSimpleFund;
