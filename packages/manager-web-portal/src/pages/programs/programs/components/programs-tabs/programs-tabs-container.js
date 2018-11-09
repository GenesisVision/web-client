import { PROGRAMS_TAB_ROUTE } from "pages/programs/programs.routes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";
import { compose } from "redux";
import replaceParams from "utils/replace-params";

import isAuthenticated from "../../../../../shared/decorators/is-authenticated";
import ProgramsTabs from "./programs-tabs";

class ProgramsTabsContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <ProgramsTabs
        tab={match.params.tab}
        onChange={this.props.handleTabChange}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleTabChange: (e, tab) => {
    dispatch(
      push(
        replaceParams(PROGRAMS_TAB_ROUTE, {
          ":tab": tab
        })
      )
    );
  }
});

export default compose(
  isAuthenticated,
  withRouter,
  connect(null, mapDispatchToProps)
)(ProgramsTabsContainer);
