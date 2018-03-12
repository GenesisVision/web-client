import QueryString from "query-string";

import filesService from "../../../shared/services/file-service";
import history from "../../../utils/history";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./traders-actions.constants";

const fetchTraders = () => {
  return {
    type: actionTypes.TRADERS,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsPost().then(
      response => {
        response.investmentPrograms.forEach(x => {
          x.logo = filesService.getFileUrl(x.logo);
        });

        return response;
      }
    )
  };
};

const shouldFetchTraders = traders => {
  return true;
};

const fetchTradersIfNeeded = traderId => (dispatch, getState) => {
  const traders = getState().tradersData.data;
  if (shouldFetchTraders(traders)) {
    return dispatch(fetchTraders());
  }
};

const composeFilter = filter => {
  switch (filter.name) {
    case "traderLevel":
      return {
        levelMin: filter.value.min,
        levelMax: filter.value.max
      };
    default:
      return {
        [filter.name]: filter.value
      };
  }
};

const updateFilters = (filter, location) => {
  const queryParams = QueryString.parse(location.search);
  const newFilters = { ...queryParams, ...composeFilter(filter) };
  history.push(`${location.pathname}?${QueryString.stringify(newFilters)}`);
};

const tradersActions = {
  fetchTradersIfNeeded,
  updateFilters
};
export default tradersActions;
