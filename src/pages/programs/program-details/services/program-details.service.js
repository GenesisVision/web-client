import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import programsApi from "services/api-client/programs-api";
import { programsApiProxy } from "services/api-client/programs-api";
import authService from "services/auth-service";
import getParams from "utils/get-params";

import * as actions from "../actions/program-details.actions";
import { tradesResponseMock } from "./trades-response-mock.js";

export const getProgramDetails = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { routing } = getState();

  const { programId } = getParams(
    routing.location.pathname,
    PROGRAM_DETAILS_ROUTE
  );

  return programsApiProxy.v10ProgramsByIdGet(programId, { authorization });
};

// export const fetchProgramDetails = () => (dispatch, getState) => {
//   const authorization = authService.getAuthArg();
//   const { routing } = getState();

//   const { programId } = getParams(
//     routing.location.pathname,
//     PROGRAM_DETAILS_ROUTE
//   );

//   dispatch(actions.fetchProgramDetails({ programId, opts: { authorization } }));
// };

export const fetchProgramChart = ({ dateFrom, dateTo, maxPointCount }) => (
  dispatch,
  getState
) => {
  const { routing } = getState();
  const { programId } = getParams(
    routing.location.pathname,
    PROGRAM_DETAILS_ROUTE
  );

  dispatch(
    actions.fetchProgramChart({
      programId,
      opts: { dateFrom, dateTo, MaxPointCount: maxPointCount }
    })
  );
};

export const fetchProgramTrades = ({ programId, currency, filters }) => {
  const opts = {
    ...filters,
    dateTo: filters.to,
    dateFrom: filters.from,
    symbol: currency
  };
  return programsApi.v10ProgramsByIdTradesGet(programId, opts).then(data => ({
    items: tradesResponseMock.data.trades,
    total: tradesResponseMock.data.total
  }));
};
