import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import { programsApiProxy } from "services/api-client/programs-api";
import authService from "services/auth-service";
import getParams from "utils/get-params";

import { composeRequestFilters } from "../../../../modules/table/services/table.service";
import { PROGRAM_SLUG_URL_PARAM_NAME } from "../../programs.routes";
import {
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../program-details.constants";

export const getProgramDescription = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { routing } = getState();

  const programSlugUrl = getParams(
    routing.location.pathname,
    PROGRAM_DETAILS_ROUTE
  )[PROGRAM_SLUG_URL_PARAM_NAME];

  return programsApiProxy.v10ProgramsByIdGet(programSlugUrl, { authorization });
};

export const getChartAndEndTrades = programId => (dispatch, getState) => {
  const { accountSettings } = getState();

  const { currency } = accountSettings;
  const tradesFilters = composeRequestFilters({
    paging: DEFAULT_PAGING,
    sorting: undefined,
    filtering: PROGRAM_TRADES_FILTERS,
    defaultFilters: PROGRAM_TRADES_DEFAULT_FILTERS
  });
  const chartDateFrom = new Date();
  chartDateFrom.setHours(chartDateFrom.getHours() - 40);
  return Promise.all([
    programsApiProxy.v10ProgramsByIdChartsProfitGet(programId, {
      currency,
      dateFrom: chartDateFrom,
      dateTo: new Date(),
      maxPointCount: 100
    }),
    getProgramTrades({ programId, currency, filters: tradesFilters })
  ]);
};

export const getProgramTrades = ({ programId, currency, filters }) => {
  const opts = {
    ...filters,
    currency
  };
  return programsApiProxy.v10ProgramsByIdTradesGet(programId, opts);
};

export const getEvents = () => (dispatch, getState) => {
  return Promise.resolve();
};
