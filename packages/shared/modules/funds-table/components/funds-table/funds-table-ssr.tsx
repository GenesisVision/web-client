import { FundsList, PlatformAsset } from "gv-api-web";
import qs from "qs";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose, Dispatch } from "redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import FundAssetFilter from "shared/components/table/components/filtering/fund-asset-filter/fund-asset-filter";
import {
  FUND_ASSET_DEFAULT_VALUE,
  FUND_ASSET_FILTER_NAME
} from "shared/components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";
import { composeFilters } from "shared/components/table/helpers/filtering.helpers";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "shared/components/table/helpers/paging.helpers";
import useRouteFilters from "shared/hooks/route-filters.hook";
import { useTranslation } from "shared/i18n";
import {
  ToggleFavoriteDispatchableType,
  toggleFavoriteFundDispatchable
} from "shared/modules/favorite-asset/services/favorite-fund.service";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { fundAssetsSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { FUNDS_ROUTE } from "shared/routes/funds.routes";
import { NextPageWithReduxContext } from "shared/utils/types";

import { SORTING_FILTER_NAME } from "../../../programs-table/components/programs-table/programs.constants";
import { fundsDataSelector } from "../../reducers/funds-table.reducers";
import FundsTable from "./funds-table";
import {
  DEFAULT_ITEMS_ON_PAGE,
  FUNDS_TABLE_FILTERS,
  SORTING_FILTER_VALUE
} from "./funds-table.constants";

const DEFAULT_FILTERS = {
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE,
  [FUND_ASSET_FILTER_NAME]: FUND_ASSET_DEFAULT_VALUE
};

export const getFiltersFromContext = ({
  asPath = "",
  pathname,
  reduxStore
}: NextPageWithReduxContext) => {
  const { page, sorting = SORTING_FILTER_VALUE, ...other } = qs.parse(
    asPath.slice(pathname.length + 1)
  );
  const { currency } = reduxStore.getState().accountSettings;
  const skipAndTake = calculateSkipAndTake({
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE,
    currentPage: page
  });
  return {
    ...composeFilters(FUNDS_TABLE_FILTERS, { ...DEFAULT_FILTERS, ...other }),
    ...skipAndTake,
    currencySecondary: currency,
    sorting
  };
};

const _FundsTableSSR: React.FC<Props> = ({
  title,
  showSwitchView,
  data,
  isAuthenticated,
  fundAssets,
  service
}) => {
  const { t } = useTranslation();
  const [filtering, sorting, page, update] = useRouteFilters(
    FUNDS_ROUTE,
    DEFAULT_FILTERS
  );

  if (!data) return null;
  const totalPages = calculateTotalPages(data.total, DEFAULT_ITEMS_ON_PAGE);

  return (
    <FundsTable
      title={title}
      data={data.funds}
      showSwitchView={showSwitchView}
      sorting={sorting || SORTING_FILTER_VALUE}
      updateSorting={value => update({ name: "sorting", value })}
      filtering={filtering}
      updateFilter={update}
      renderFilters={(updateFilter: any, filtering: FilteringType) => (
        <>
          <FundAssetFilter
            name={FUND_ASSET_FILTER_NAME}
            value={filtering[FUND_ASSET_FILTER_NAME] as string[]}
            values={fundAssets}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        </>
      )}
      paging={{
        totalPages: totalPages,
        currentPage: page,
        itemsOnPage: DEFAULT_ITEMS_ON_PAGE,
        totalItems: data.total
      }}
      updatePaging={page => update({ name: "page", value: page + 1 })}
      toggleFavorite={service.toggleFavoriteFund}
      isAuthenticated={isAuthenticated}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  data: fundsDataSelector(state),
  isAuthenticated: isAuthenticatedSelector(state),
  fundAssets: fundAssetsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      toggleFavoriteFund: toggleFavoriteFundDispatchable
    },
    dispatch
  )
});

const FundsTableSSR = compose<React.FC<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_FundsTableSSR);

export default FundsTableSSR;

interface OwnProps {
  showSwitchView: boolean;
  title: string;
}

interface StateProps {
  isAuthenticated: boolean;
  data?: FundsList;
  fundAssets: PlatformAsset[];
}

interface DispatchProps {
  service: {
    toggleFavoriteFund: ToggleFavoriteDispatchableType;
  };
}

interface Props extends OwnProps, StateProps, DispatchProps {}
