import Surface from "shared/components/surface/surface";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";

import { toggleFavoriteFundDispatchable } from "shared/modules/favorite-asset/services/favorite-fund.service";
import * as fundsService from "../../services/funds-table.service";
import FundsTable from "shared/components/funds-table/funds-table";

class FundsTableContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getFunds();
  }

  componentDidUpdate(prevProps) {
    const { service, isLocationChanged } = this.props;
    if (isLocationChanged(prevProps.location)) {
      service.getFunds();
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
      <Surface className="funds-table-container">
        <FundsTable
          title={title}
          data={data || {}}
          isPending={isPending}
          sorting={filters.sorting}
          updateSorting={service.fundsChangeSorting}
          filtering={{
            ...filters.filtering
          }}
          updateFilter={service.fundsChangeFilter}
          paging={{
            totalPages: filters.pages,
            currentPage: filters.page
          }}
          updatePaging={service.fundsChangePage}
          toggleFavorite={service.toggleFavoriteFund}
          isAuthenticated={isAuthenticated}
        />
      </Surface>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  const { isPending, data } = state.fundsData.items;
  return { isPending, data, isAuthenticated };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      ...fundsService,
      toggleFavoriteFund: toggleFavoriteFundDispatchable
    },
    dispatch
  )
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { location } = ownProps;
  const isLocationChanged = prevLocation => {
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
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(FundsTableContainer);
