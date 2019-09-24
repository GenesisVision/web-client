import {
  CancelablePromise,
  DashboardChartValue,
  FundsList,
  InvestmentEventViewModels,
  ProgramRequests,
  ProgramsList,
  SignalsList
} from "gv-api-web";
import { Action } from "redux";
import chartPeriodActionCreator from "shared/actions/chart-period.action-creator";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { EVENTS_ACTION_TYPE } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import {
  EVENT_LOCATION,
  fetchPortfolioEventsWithoutTable
} from "shared/components/programs/program-details/services/program-details.service";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import investorApi from "shared/services/api-client/investor-api";
import { ActionType } from "shared/utils/types";

export const DASHBOARD_PROGRAMS = "DASHBOARD_PROGRAMS";
export const DASHBOARD_FUNDS = "DASHBOARD_FUNDS";
export const DASHBOARD_COPYTRADING = "DASHBOARD_COPYTRADING";
export const DASHBOARD_PORTFOLIO_CHART = "DASHBOARD_PORTFOLIO_CHART";
export const DASHBOARD_PORTFOLIO_EVENTS = "DASHBOARD_PORTFOLIO_EVENTS";
export const DASHBOARD_IN_REQUESTS = "DASHBOARD_IN_REQUESTS";
export const DASHBOARD_CANCEL_FUND_REQUESTS = "DASHBOARD_CANCEL_FUND_REQUESTS";
export const DASHBOARD_CANCEL_PROGRAM_REQUESTS =
  "DASHBOARD_CANCEL_PROGRAM_REQUESTS";

export const CLEAR_DASHBOARD_ASSETS_TABLE = "CLEAR_DASHBOARD_ASSETS_TABLE";

export const fetchEventsAction = (
  filters: ComposeFiltersAllType,
  eventLocation: EVENT_LOCATION
): ActionType<CancelablePromise<InvestmentEventViewModels>> => ({
  type: EVENTS_ACTION_TYPE,
  payload: fetchPortfolioEventsWithoutTable(eventLocation, filters)
});

export const fetchDashboardProgramsAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ActionType<Promise<ProgramsList>> => ({
  type: DASHBOARD_PROGRAMS,
  payload: investorApi.v10InvestorProgramsGet(auth, filters)
});

export const fetchDashboardFundsAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ActionType<Promise<FundsList>> => ({
  type: DASHBOARD_FUNDS,
  payload: investorApi.v10InvestorFundsGet(auth, filters)
});

export const fetchDashboardCopytradingAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ActionType<Promise<SignalsList>> => ({
  type: DASHBOARD_COPYTRADING,
  payload: investorApi.v10InvestorSignalsGet(auth, filters)
});

export const fetchPortfolioChartAction = (
  auth: string,
  filters?: ComposeFiltersAllType
): ActionType<Promise<DashboardChartValue>> => ({
  type: DASHBOARD_PORTFOLIO_CHART,
  payload: investorApi.v10InvestorPortfolioChartGet(auth, filters)
});

export const fetchPortfolioEventsAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> => ({
  type: DASHBOARD_PORTFOLIO_EVENTS,
  payload: investorApi.v10InvestorInvestmentsEventsGet(auth, filters)
});

export const fetchInRequestsAction = (
  auth: string,
  skip: number,
  take: number
): ActionType<Promise<ProgramRequests>> => ({
  type: DASHBOARD_IN_REQUESTS,
  payload: investorApi.v10InvestorRequestsBySkipByTakeGet(skip, take, auth)
});

export const cancelProgramRequestAction = (
  auth: string,
  id: string
): ActionType<CancelablePromise<any>> => ({
  type: DASHBOARD_CANCEL_PROGRAM_REQUESTS,
  payload: investorApi.v10InvestorProgramsRequestsByIdCancelPost(id, auth)
});

export const changeChartPeriodAction = (period: ChartDefaultPeriod): Action =>
  chartPeriodActionCreator(DASHBOARD_PORTFOLIO_CHART, period);

export const clearDashboardAssetsTableAction = (): Action => ({
  type: CLEAR_DASHBOARD_ASSETS_TABLE
});
