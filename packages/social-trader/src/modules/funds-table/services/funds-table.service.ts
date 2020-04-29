import {
  ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE,
  DATE_RANGE_MAX_FILTER_NAME,
  DATE_RANGE_MIN_FILTER_NAME
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeRequestValueFunc } from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { composeFilters } from "components/table/helpers/filtering.helpers";
import { calculateSkipAndTake } from "components/table/helpers/paging.helpers";
import {
  FundDetailsListItem,
  FundDetailsListItemItemsViewModel
} from "gv-api-web";
import * as qs from "qs";
import { FAVORITES_TAB_NAME } from "routes/invest.routes";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { getAccountCurrency } from "utils/account-currency";
import { NextPageWithReduxContext } from "utils/types";

import {
  DEFAULT_FUND_TABLE_FILTERS,
  DEFAULT_ITEMS_ON_PAGE,
  FUNDS_TABLE_FILTERS,
  SORTING_FILTER_VALUE
} from "../components/funds-table/funds-table.constants";

export const fetchFundsChallengeWinner = (): Promise<Array<
  FundDetailsListItem
>> => {
  return api
    .funds()
    .getLastChallengeWinner()
    .then(item => [item]);
};

export type FetchFundsType = (
  filters: ComposeFiltersAllType,
  token?: Token
) => Promise<FundDetailsListItemItemsViewModel>;
export const fetchFunds: FetchFundsType = (filters, token) => {
  return api.funds(token).getFunds(filters);
};

export const getFiltersFromContext = (ctx: NextPageWithReduxContext) => {
  const showFavorites = ctx.pathname.includes(FAVORITES_TAB_NAME);
  const { asPath = "", pathname } = ctx;
  const {
    page,
    sorting = SORTING_FILTER_VALUE,
    dateRange = ASSET_TABLE_DEFAULT_DATE_RANGE_FILTER_VALUE,
    showIn,
    ...other
  } = qs.parse(asPath.slice(pathname.length + 1));
  const accountCurrency = getAccountCurrency(ctx);

  const skipAndTake = calculateSkipAndTake({
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE,
    currentPage: page
  });

  const dateRangeValues = composeRequestValueFunc(
    DATE_RANGE_MIN_FILTER_NAME,
    DATE_RANGE_MAX_FILTER_NAME
  )(dateRange);
  return {
    ...composeFilters(FUNDS_TABLE_FILTERS, {
      ...DEFAULT_FUND_TABLE_FILTERS,
      ...other
    }),
    ...skipAndTake,
    ...dateRangeValues,
    showIn: showIn || accountCurrency,
    sorting,
    showFavorites
  };
};
