import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from "react-router-redux";
import { compose } from "redux";

import isAuthenticated from "shared/decorators/is-authenticated";
import replaceParams from "shared/utils/replace-params";

import FundsNavigationTabs from "./navigation-tabs";

class NavigationTabsContainer extends Component {
  render() {
    return (
      <FundsNavigationTabs tab={this.props.match.params.tab} {...this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  handleTabChange: (e, tab) => {
    dispatch(
      push(
        replaceParams(props.routes.FUNDS_TAB_ROUTE, {
          ":tab": tab
        })
      )
    );
  }
});

export default compose(
  isAuthenticated,
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(NavigationTabsContainer);
