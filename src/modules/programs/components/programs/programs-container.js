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

  render() {
    const { isPending, data } = this.props;
    if (isPending || !data) return null;
    return (
      <Surface>
        Title Filtering
        <ProgramsHeader />
        <Programs programs={data.programs} />
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
    var t = 1;
    dispatch(programsService.getPrograms());
  }
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramsContainer);
