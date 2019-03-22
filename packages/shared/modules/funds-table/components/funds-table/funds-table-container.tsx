import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose, Dispatch } from "redux";
import { toggleFavoriteFundDispatchable } from "shared/modules/favorite-asset/services/favorite-fund.service";

import * as fundsService from "../../services/funds-table.service";
import {
  FundsChangeFilterType,
  FundsChangePageType,
  FundsChangeSortingType,
  GetFundsFiltersType,
  GetFundsType
} from "../../services/funds-table.service";
import FundsTable from "./funds-table";
import RootState from "shared/reducers/root-reducer";
import { FundsList } from "gv-api-web";
import { Location } from "history";
import { RouteComponentProps } from "react-router";
import { FiltersType } from "shared/components/table/components/table.types";

interface OwnProps {
  isLocationChanged?(location: Location): boolean;
  defaultFilters?: any;
  filters: FiltersType;
  title?: string;
}

interface StateProps {
  isPending: boolean;
  data: FundsList;
  isAuthenticated: boolean;
}

interface DispatchProps {
  service: {
    getFunds: GetFundsType;
    fundsChangeSorting: FundsChangeSortingType;
    fundsChangeFilter: FundsChangeFilterType;
    fundsChangePage: FundsChangePageType;
    getFundsFilters: GetFundsFiltersType;
    toggleFavoriteFund: (id: string, selected: boolean) => void; // Declare type after convert "shared/modules/favorite-asset/services/favorite-fund.service.js"
  };
}

interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}

class FundsTableContainer extends React.PureComponent<Props> {
  componentDidMount() {
    const { service, defaultFilters } = this.props;
    service.getFunds(defaultFilters);
  }

  componentDidUpdate(prevProps: Props) {
    const { service, isLocationChanged, defaultFilters } = this.props;
    if (isLocationChanged && isLocationChanged(prevProps.location)) {
      service.getFunds(defaultFilters);
    }
  }

  render() {
    const {
      isPending,
      data,
      filters,
      service,
      isAuthenticated,
      title
    } = this.props;
    return (
      <FundsTable
        title={title}
        data={data}
        isPending={isPending}
        sorting={filters.sorting}
        updateSorting={service.fundsChangeSorting}
        filtering={{
          ...filters.filtering
        }}
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

const mapStateToProps = (state: RootState): StateProps => {
  const { isAuthenticated } = state.authData;
  const { isPending, data = { funds: [], total: 0 } } = state.fundsData.items;
  return { isPending, data, isAuthenticated };
};

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
) => {
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

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
)(FundsTableContainer);
