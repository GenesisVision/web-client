import Surface from "components/surface/surface";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import { toggleFavoriteProgramDispatchable } from "../../../favorite-asset/services/favorite-program.service";
import * as programsService from "../../services/programs-table.service";
import ProgramsTable from "./programs-table";

class ProgramsContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getPrograms();
  }

  componentDidUpdate(prevProps) {
    const { service, isLocationChanged } = this.props;
    if (isLocationChanged(prevProps.location)) {
      service.getPrograms();
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
      <Surface className="programs-table-container">
        <ProgramsTable
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
        />
      </Surface>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  const { isPending, data } = state.programsData.items;
  return { isPending, data, isAuthenticated };
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
