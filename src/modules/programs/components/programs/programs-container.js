import Surface from "components/surface/surface";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import programsService from "../../services/programs-service";
import Programs from "./programs";
import ProgramsHeader from "./programs-header";

class ProgramsContainer extends Component {
  componentDidMount() {
    const { getPrograms } = this.props;
    getPrograms();
  }

  componentDidUpdate(prevProps) {
    const { getPrograms, isLocationChanged } = this.props;
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
      getPrograms();
    }
  }

  render() {
    const { isPending, data, openProgramDetail } = this.props;
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
        Paging
      </Surface>
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.programsData.items;
  return { isPending, data };
};

const mapDispatchToProps = dispatch => ({
  getPrograms: () => {
    dispatch(programsService.getPrograms());
  },
  isLocationChanged: (prev, curr) => {
    return programsService.isLocationChanged(prev, curr);
  }
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramsContainer);
