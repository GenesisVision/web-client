import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { ItemsViewModelFundDetailsList } from "gv-api-web";
import fundsApi from "shared/services/api-client/funds-api";
import { ApiAction } from "utils/types";

export const FUNDS_TABLE = "FUNDS_TABLE";

export type TFetchFundsAction = ApiAction<ItemsViewModelFundDetailsList>;
export const fetchFundsAction = (
  filters: ComposeFiltersAllType
): TFetchFundsAction => ({
  type: FUNDS_TABLE,
  payload: fundsApi.getFunds(filters)
});
