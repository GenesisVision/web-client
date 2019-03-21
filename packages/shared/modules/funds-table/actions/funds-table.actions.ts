import fundsApi from "shared/services/api-client/funds-api";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";

export const FUNDS_TABLE = "FUNDS_TABLE";

export const fetchFunds = (filters: ComposeFiltersAllType) => {
  return {
    type: FUNDS_TABLE,
    payload: fundsApi.v10FundsGet(filters)
  }
};
