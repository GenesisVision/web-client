import Surface from "components/surface/surface";
import Paging from "modules/paging/components/paging/paging";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";

import * as programsService from "../../services/programs-service";
import Programs from "./programs";
import ProgramsHeader from "./programs-header";

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
    const { isPending, data, filters, service } = this.props;
    if (!data) return <div>Loading...</div>;
    return (
      <Surface>
        All Programs
        <Paging
          paging={{ total: filters.pages, current: filters.page }}
          hide={isPending}
          updatePaging={next => service.programsChangePage(next.currentPage)}
        />
        <ProgramsHeader
          sorting={filters.sorting}
          updateSorting={service.programsChangeSorting}
        />
        <Programs data={data} />
      </Surface>
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.programsData.items;
  return { isPending, data };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(programsService, dispatch)
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { location } = ownProps;
  const isLocationChanged = prevLocation => {
    return location.key !== prevLocation.key;
  };
  const filters = dispatchProps.service.getProgramsFiltering();
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
