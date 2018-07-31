import SwaggerInvestorApi from "services/api-client/swagger-investor-api";
import authService from "services/auth-service";

export const HEADER_INFO = "HEADER_INFO";

const fetchHeaderInfo = () => ({
  type: HEADER_INFO,
  payload: SwaggerInvestorApi.apiInvestorProfileHeaderGet(
    authService.getAuthArg()
  )
});

let counter;

export const initHeaderInfo = () => dispatch => {
  dispatch(fetchHeaderInfo());
  counter = setInterval(() => {
    dispatch(fetchHeaderInfo());
  }, 1000);
};

export const deinitHeaderInfo = () => {
  clearInterval(counter);
};
