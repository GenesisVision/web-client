import { FundsListOld, PlatformAsset, PlatformCurrency } from "gv-api-web";
import { Location } from "history";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose, Dispatch } from "redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import FundAssetFilter from "shared/components/table/components/filtering/fund-asset-filter/fund-asset-filter";
import { FUND_ASSET_FILTER_NAME } from "shared/components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import {
  ToggleFavoriteDispatchableType,
  toggleFavoriteFundDispatchable
} from "shared/modules/favorite-asset/services/favorite-fund.service";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import {
  fundAssetsSelector,
  platformCurrenciesSelector
} from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { fundsDataSelector } from "../../reducers/funds-table.reducers";
import * as fundsService from "../../services/funds-table.service";
import {
  FundsChangeFilterType,
  FundsChangePageType,
  FundsChangeSortingType,
  GetFundsFiltersType,
  GetFundsType
} from "../../services/funds-table.service";
import FundsTable from "./funds-table";
import { CURRENCY_FILTER_NAME } from "./funds-table.constants";

class _FundsTableContainer extends React.PureComponent<Props> {
  componentDidMount() {
    const { service } = this.props;
    service.getFunds();
  }

  componentDidUpdate(prevProps: Props) {
    const { service, isLocationChanged } = this.props;
    if (isLocationChanged && isLocationChanged(prevProps.location)) {
      service.getFunds();
    }
  }

  render() {
    const {
      t,
      data,
      filters,
      service,
      isAuthenticated,
      fundAssets,
      title,
      currencies
    } = this.props;
    return (
      <FundsTable
        title={title}
        data={data ? data.funds : undefined}
        sorting={filters.sorting}
        updateSorting={service.fundsChangeSorting}
        filtering={filters.filtering}
        renderMappings={(updateFilter, filtering) => (
          <>
            <SelectFilter
              name={CURRENCY_FILTER_NAME}
              label={t("filters.currency.show-in")}
              value={filtering && filtering[CURRENCY_FILTER_NAME]}
              values={currencies.map(x => ({ value: x.name, label: x.name }))}
              onChange={updateFilter}
            />
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering && filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              label={t("filters.date-range.for")}
              startLabel={t("filters.date-range.fund-start")}
            />
          </>
        )}
        renderFilters={(updateFilter, filtering) => (
          <>
            <FundAssetFilter
              name={FUND_ASSET_FILTER_NAME}
              value={filtering[FUND_ASSET_FILTER_NAME] as string[]}
              values={fundAssets || []}
              onChange={updateFilter}
            />
          </>
        )}
        updateFilter={service.fundsChangeFilter}
        paging={{
          totalPages: filters.paging ? filters.paging.totalPages : 0,
          currentPage: filters.paging ? filters.paging.currentPage : 1,
          itemsOnPage: filters.paging ? filters.paging.itemsOnPage : 0,
          totalItems: data ? data.total : 0
        }}
        updatePaging={service.fundsChangePage}
        toggleFavorite={service.toggleFavoriteFund}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  data: fundsDataSelector(state),
  isAuthenticated: isAuthenticatedSelector(state),
  fundAssets: fundAssetsSelector(state),
  currencies: platformCurrenciesSelector(state),
  currency: currencySelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      ...fundsService,
      toggleFavoriteFund: toggleFavoriteFundDispatchable
    },
    dispatch
  )
});

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: RouteComponentProps
): StateProps & DispatchProps & RouteComponentProps & MergeProps => {
  const { location } = ownProps;
  const isLocationChanged = (prevLocation: Location) => {
    return location.key !== prevLocation.key;
  };
  let filters = dispatchProps.service.getFundsFilters() as any;

  if (!filters.filtering[CURRENCY_FILTER_NAME]) {
    filters.filtering[CURRENCY_FILTER_NAME] = stateProps.currency;
  }
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    filters,
    isLocationChanged
  };
};

const FundsTableContainer = compose<React.ComponentType<OwnProps>>(
  withRouter,
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
)(_FundsTableContainer);

export default FundsTableContainer;

interface OwnProps {
  title?: string;
}

interface MergeProps {
  isLocationChanged: (location: Location) => boolean;
  filters: { [keys: string]: any };
}

interface StateProps {
  isAuthenticated: boolean;
  data?: FundsListOld;
  fundAssets: PlatformAsset[];
  currencies: PlatformCurrency[];
  currency: CurrencyEnum;
}

interface DispatchProps {
  service: {
    getFunds: GetFundsType;
    fundsChangeSorting: FundsChangeSortingType;
    fundsChangeFilter: FundsChangeFilterType;
    fundsChangePage: FundsChangePageType;
    getFundsFilters: GetFundsFiltersType;
    toggleFavoriteFund: ToggleFavoriteDispatchableType;
  };
}

interface Props
  extends OwnProps,
    WithTranslation,
    MergeProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
