import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import programsApi from "services/api-client/programs-api";
import authService from "services/auth-service";
import getParams from "utils/get-params";

import * as actions from "../actions/program-details.actions";

export const fetchProgramDetails = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { routing } = getState();

  const { programId } = getParams(
    routing.location.pathname,
    PROGRAM_DETAILS_ROUTE
  );

  dispatch(actions.fetchProgramDetails({ programId, opts: { authorization } }));
};

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

const tradesResponseMock = {
  data: {
    trades: [
      {
        id: "string",
        login: "string",
        ticket: "string",
        symbol: "string",
        volume: 0,
        profit: 0,
        direction: "Buy",
        date: "2018-09-12T10:40:48.657Z",
        price: 0,
        entry: "In"
      },
      {
        id: "string",
        login: "string",
        ticket: "string",
        symbol: "string",
        volume: 0,
        profit: 0,
        direction: "Buy",
        date: "2018-09-12T10:40:48.657Z",
        price: 0,
        entry: "In"
      },
      {
        id: "string",
        login: "string",
        ticket: "string",
        symbol: "string",
        volume: 0,
        profit: 0,
        direction: "Buy",
        date: "2018-09-12T10:40:48.657Z",
        price: 0,
        entry: "In"
      },
      {
        id: "string",
        login: "string",
        ticket: "string",
        symbol: "string",
        volume: 0,
        profit: 0,
        direction: "Buy",
        date: "2018-09-12T10:40:48.657Z",
        price: 0,
        entry: "In"
      },
      {
        id: "string",
        login: "string",
        ticket: "string",
        symbol: "string",
        volume: 0,
        profit: 0,
        direction: "Buy",
        date: "2018-09-12T10:40:48.657Z",
        price: 0,
        entry: "In"
      },
      {
        id: "string",
        login: "string",
        ticket: "string",
        symbol: "string",
        volume: 0,
        profit: 0,
        direction: "Buy",
        date: "2018-09-12T10:40:48.657Z",
        price: 0,
        entry: "In"
      },
      {
        id: "string",
        login: "string",
        ticket: "string",
        symbol: "string",
        volume: 0,
        profit: 0,
        direction: "Buy",
        date: "2018-09-12T10:40:48.657Z",
        price: 0,
        entry: "In"
      },
      {
        id: "string",
        login: "string",
        ticket: "string",
        symbol: "string",
        volume: 0,
        profit: 0,
        direction: "Buy",
        date: "2018-09-12T10:40:48.657Z",
        price: 0,
        entry: "In"
      },
      {
        id: "string",
        login: "string",
        ticket: "string",
        symbol: "string",
        volume: 0,
        profit: -25,
        direction: "Buy",
        date: "2018-09-12T10:40:48.657Z",
        price: 0,
        entry: "In"
      },
      {
        id: "string",
        login: "string",
        ticket: "string",
        symbol: "string",
        volume: 0,
        profit: 25,
        direction: "Sell",
        date: "2018-09-12T10:40:48.657Z",
        price: 0,
        entry: "In"
      }
    ],
    total: 15
  }
};

export const fetchProgramTrades = ({ programId, currentCurrency, filters }) => {
  const opts = {
    ...filters,
    dateTo: filters.to,
    dateFrom: filters.from,
    symbol: currentCurrency
  };
  return programsApi.v10ProgramsByIdTradesGet(programId, opts).then(data => ({
    items: tradesResponseMock.data.trades,
    total: tradesResponseMock.data.total
  }));
};
