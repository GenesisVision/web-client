import { FundsList, PlatformAsset } from "gv-api-web";
import { Location } from "history";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { Dispatch, bindActionCreators, compose } from "redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  ToggleFavoriteDispatchableType,
  toggleFavoriteFundDispatchable
} from "shared/modules/favorite-asset/services/favorite-fund.service";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { RootState } from "shared/reducers/root-reducer";
import fundsApi from "shared/services/api-client/funds-api";

import FundAssetFilter from "../../../../components/table/components/filtering/fund-asset-filter/fund-asset-filter";
import { FUND_ASSET_FILTER_NAME } from "../../../../components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";
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

interface OwnProps {
  defaultFilters?: any;
  title?: string;
}

interface MergeProps {
  isLocationChanged: (location: Location) => boolean;
  filters: { [keys: string]: any };
}

interface StateProps {
  isAuthenticated: boolean;
  data?: FundsList;
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
    InjectedTranslateProps,
    MergeProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}

interface State {
  fundAssets?: PlatformAsset[];
}

class _FundsTableContainer extends React.PureComponent<Props, State> {
  state = {
    fundAssets: undefined
  };

  componentDidMount() {
    const { service, defaultFilters } = this.props;
    service.getFunds(defaultFilters);
    fundsApi.v10FundsAssetsGet().then(data => {
      this.setState({ fundAssets: data.assets });
    });
  }

  componentDidUpdate(prevProps: Props) {
    const { service, isLocationChanged, defaultFilters } = this.props;
    if (isLocationChanged && isLocationChanged(prevProps.location)) {
      service.getFunds(defaultFilters);
    }
  }

  render() {
    const { t, data, filters, service, isAuthenticated, title } = this.props;
    return (
      <FundsTable
        title={title}
        data={data ? data.funds : undefined}
        sorting={filters.sorting}
        updateSorting={service.fundsChangeSorting}
        filtering={{
          ...filters.filtering
        }}
        renderFilters={(updateFilter, filtering) => (
          <>
            <FundAssetFilter
              name={FUND_ASSET_FILTER_NAME}
              value={filtering[FUND_ASSET_FILTER_NAME] as string[]}
              values={this.state.fundAssets || []}
              onChange={updateFilter}
            />
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering && filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.fund-start")}
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
  isAuthenticated: isAuthenticatedSelector(state)
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
  const filters = dispatchProps.service.getFundsFilters();
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
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
)(_FundsTableContainer);
export default FundsTableContainer;
