import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import ProgramsTableModule from "./programs-table-module";
import Surface from "shared/components/surface/surface";
import { toggleFavoriteProgramDispatchable } from "shared/modules/favorite-asset/services/favorite-program.service";

import * as programsService from "../../services/programs-table.service";

class ProgramsContainer extends Component {
  componentDidMount() {
    const { service, defaultFilters } = this.props;
    service.getPrograms(defaultFilters);
  }

  componentDidUpdate(prevProps) {
    const { service, isLocationChanged, defaultFilters } = this.props;
    if (isLocationChanged(prevProps.location)) {
      service.getPrograms(defaultFilters);
    }
  }

  render() {
    const {
      enableFiltering,
      enableViews,
      currencies,
      isPending,
      data,
      filters,
      service,
      isAuthenticated,
      title
    } = this.props;
    return (
      <ProgramsTableModule
        enableFiltering={enableFiltering}
        enableViews={enableViews}
        title={title}
        data={data || {}}
        isPending={isPending}
        sorting={filters.sorting}
        updateSorting={service.programsChangeSorting}
        filtering={{
          ...filters.filtering
        }}
        updateFilter={service.programsChangeFilter}
        paging={{
          totalPages: filters.pages,
          currentPage: filters.page
        }}
        updatePaging={service.programsChangePage}
        toggleFavorite={service.toggleFavoriteProgram}
        redirectToLogin={service.redirectToLogin}
        isAuthenticated={isAuthenticated}
        currencies={currencies}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  const { isPending, data } = state.programsData.items;
  const currencies = state.platformData.data
    ? state.platformData.data.currencies
    : [];
  return { isPending, data, isAuthenticated, currencies };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      ...programsService,
      toggleFavoriteProgram: toggleFavoriteProgramDispatchable,
      redirectToLogin: () => push(LOGIN_ROUTE)
    },
    dispatch
  )
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { location } = ownProps;
  const isLocationChanged = prevLocation => {
    return location.key !== prevLocation.key;
  };
  const filters = dispatchProps.service.getProgramsFilters();
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
)(ProgramsContainer);
