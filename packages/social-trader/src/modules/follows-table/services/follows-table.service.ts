import { composeFilters } from "components/table/helpers/filtering.helpers";
import { calculateSkipAndTake } from "components/table/helpers/paging.helpers";
import { ItemsViewModelFollowDetailsListItem } from "gv-api-web";
import * as qs from "qs";
import followApi from "services/api-client/follow-api";
import authService from "services/auth-service";
import { NextPageWithReduxContext } from "utils/types";

import { FetchSignalAssetsFilterType } from "../actions/follows-table.actions";
import {
  DEFAULT_FOLLOW_TABLE_FILTERS,
  FOLLOW_TABLE_FILTERS,
  SORTING_FILTER_VALUE
} from "../components/follows.constants";

const DEFAULT_ITEMS_ON_PAGE = 12;

export const getFiltersFromContext = ({
  asPath = "",
  pathname,
  reduxStore
}: NextPageWithReduxContext): FetchSignalAssetsFilterType => {
  const { page, sorting = SORTING_FILTER_VALUE, ...other } = qs.parse(
    asPath.slice(pathname.length + 1)
  );
  const { currency } = reduxStore.getState().accountSettings;
  const skipAndTake = calculateSkipAndTake({
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE,
    currentPage: page
  });
  return {
    ...skipAndTake,
    ...composeFilters(FOLLOW_TABLE_FILTERS, {
      ...DEFAULT_FOLLOW_TABLE_FILTERS,
      ...other
    }),
    currencySecondary: currency,
    sorting
  } as FetchSignalAssetsFilterType;
};

export const fetchFollows = (
  filters: FetchSignalAssetsFilterType
): Promise<ItemsViewModelFollowDetailsListItem> => {
  return followApi.getFollowAssets({
    ...filters,
    authorization: authService.getAuthArg()
  });
};
