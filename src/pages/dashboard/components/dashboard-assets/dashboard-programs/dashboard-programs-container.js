import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as dashboardProgramsService from "../../../services/dashboard-programs.service";
import DashboardPrograms from "./dashboard-programs";

class DashboardProgramsContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getPrograms();
  }

  render() {
    const { isPending, data, filters, service } = this.props;
    return (
      <DashboardPrograms
        isPending={isPending}
        data={data || {}}
        sorting={{
          value: filters.sorting,
          updateSorting: service.programsChangeSorting
        }}
        filtering={{
          ...filters.filtering,
          updateFilter: service.programsChangeFilter
        }}
        paging={{
          total: filters.pages,
          current: filters.page,
          updatePaging: service.programsChangePage
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.dashboard.programs.itemsData;
  return { isPending, data };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(dashboardProgramsService, dispatch)
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const filters = {}; // dispatchProps.service.getProgramsFilters();
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    filters
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DashboardProgramsContainer);
