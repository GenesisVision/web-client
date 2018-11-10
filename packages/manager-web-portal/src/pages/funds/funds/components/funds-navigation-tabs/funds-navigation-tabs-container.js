import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";
import replaceParams from "shared/utils/replace-params";

import { FUNDS_TAB_ROUTE } from "../../../funds.routes";
import FundsNavigationTabs from "./funds-navigation-tabs";

class FundsNavigationTabsContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <FundsNavigationTabs
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
        replaceParams(FUNDS_TAB_ROUTE, {
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
)(FundsNavigationTabsContainer);
