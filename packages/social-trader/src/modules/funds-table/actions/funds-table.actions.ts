import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { FundDetailsListItemItemsViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { ApiAction } from "utils/types";

export const FUNDS_TABLE = "FUNDS_TABLE";

export type TFetchFundsAction = ApiAction<FundDetailsListItemItemsViewModel>;
export const fetchFundsAction = (
  filters: ComposeFiltersAllType,
  token?: Token
): TFetchFundsAction => ({
  type: FUNDS_TABLE,
  payload: api.funds(token).getFunds(filters)
});
