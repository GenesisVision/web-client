import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import fundsApi from "shared/services/api-client/funds-api";

export const FUNDS_TABLE = "FUNDS_TABLE";

export const fetchFundsAction = (filters: ComposeFiltersAllType) => {
  return {
    type: FUNDS_TABLE,
    payload: fundsApi.v10FundsGet(filters)
  }
};
