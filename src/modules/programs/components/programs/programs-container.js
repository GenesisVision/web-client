import Surface from "components/surface/surface";
import Paging from "modules/paging/components/paging/paging";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import {
  programsServiceChangePage,
  programsServiceGetFilteringFromUrl,
  programsServiceGetPrograms
} from "../../services/programs-service";
import Programs from "./programs";
import ProgramsHeader from "./programs-header";

class ProgramsContainer extends Component {
  componentDidMount() {
    const { programsServiceGetPrograms } = this.props;
    programsServiceGetPrograms();
  }

  componentDidUpdate(prevProps) {
    const { programsServiceGetPrograms, isLocationChanged } = this.props;
    if (
      isLocationChanged(
        {
          params: prevProps.match.params,
          search: prevProps.location.search
        },
        {
          params: this.props.match.params,
          search: this.props.location.search
        }
      )
    ) {
      programsServiceGetPrograms();
    }
  }

  render() {
    const {
      isPending,
      data,
      filters,
      openProgramDetail,
      programsServiceChangePage
    } = this.props;
    if (isPending || !data) return null;
    return (
      <Surface>
        All Programs Filtering
        <Paging
          paging={{ total: data.total, current: filters.page }}
          hide={isPending}
          updatePaging={next => programsServiceChangePage(next.currentPage)}
        />
        <ProgramsHeader />
        <Programs
          programs={data.programs}
          current
          openProgramDetail={openProgramDetail}
        />
      </Surface>
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.programsData.items;
  return { isPending, data };
};

const mapDispatchToProps = {
  programsServiceGetPrograms,
  programsServiceGetFilteringFromUrl,
  programsServiceChangePage
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { location, history, match } = ownProps;
  const isLocationChanged = () => {
    return location.pathname !== history.location.pathname;
  };
  const filters = dispatchProps.programsServiceGetFilteringFromUrl();
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    filters,
    isLocationChanged,
    updatePaging: paging => {
      //dispatch(programService.changeProgramRequestsPage(programId, paging));
    }
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
