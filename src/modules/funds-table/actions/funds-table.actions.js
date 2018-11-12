import fundsApi from "services/api-client/funds-api";

export const FUNDS_TABLE = "FUNDS_TABLE";

export const fetchFunds = filters => {
  return {
    type: FUNDS_TABLE,
    payload: fundsApi.v10FundsGet(filters)
  };
};
