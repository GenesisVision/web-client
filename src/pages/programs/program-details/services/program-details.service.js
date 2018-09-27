import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import authService from "services/auth-service";
import getParams from "utils/get-params";

import { DEFAULT_PAGING } from "../../../../modules/table/reducers/table-paging.reducer";
import { composeRequestFilters } from "../../../../modules/table/services/table.service";
import { programsApiProxy } from "../../../../services/api-client/programs-api";
import {
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../program-details.constants";

export const getProgramDescription = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { routing } = getState();

  const { programId } = getParams(
    routing.location.pathname,
    PROGRAM_DETAILS_ROUTE
  );

  return programsApiProxy.v10ProgramsByIdGet(programId, { authorization });
};

export const getChartAndEndTrades = () => (dispatch, getState) => {
  const { routing, accountSettings } = getState();

  const { programId } = getParams(
    routing.location.pathname,
    PROGRAM_DETAILS_ROUTE
  );
  const { currency } = accountSettings.currency;
  const tradesFilters = composeRequestFilters({
    paging: DEFAULT_PAGING,
    sorting: undefined,
    filtering: PROGRAM_TRADES_FILTERS,
    defaultFilters: PROGRAM_TRADES_DEFAULT_FILTERS
  });
  return Promise.all([
    programsApiProxy.v10ProgramsByIdChartGet(programId, {
      // dateFrom,
      // dateTo,
      // maxPointCount
    }),
    getProgramTrades({ programId, currency, filters: tradesFilters })
  ]);
};

// export const getProgramChart = ({ dateFrom, dateTo, maxPointCount }) => (
//   dispatch,
//   getState
// ) => {
//   const { routing } = getState();
//   const { programId } = getParams(
//     routing.location.pathname,
//     PROGRAM_DETAILS_ROUTE
//   );

//   dispatch(
//     actions.fetchProgramChart({
//       programId,
//       opts: { dateFrom, dateTo, MaxPointCount: maxPointCount }
//     })
//   );
// };

export const getProgramTrades = ({ programId, currency, filters }) => {
  const opts = {
    ...filters,
    symbol: currency
  };
  return programsApiProxy.v10ProgramsByIdTradesGet(programId, opts);
};

export const getEvents = ({}) => {};
