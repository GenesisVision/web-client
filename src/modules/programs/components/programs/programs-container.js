import Surface from "components/surface/surface";
import Paging from "modules/paging/components/paging/paging";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import {
  programsServiceGetPrograms,
  programsServiceIsLocationChanged
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
      paging,
      openProgramDetail,
      updatePaging
    } = this.props;
    if (isPending || !data) return null;
    return (
      <Surface>
        All Programs Filtering
        <ProgramsHeader />
        <Programs
          programs={data.programs}
          current
          openProgramDetail={openProgramDetail}
        />
        {/* <Paging paging={paging} hide={isPending} updatePaging={updatePaging} /> */}
      </Surface>
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.programsData.items;
  return { isPending, data };
};

const mapDispatchToProps = {
  programsServiceGetPrograms
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { location, history, match } = ownProps;
  const isLocationChanged = () => {
    return location.pathname !== history.location.pathname;
  };
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
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
