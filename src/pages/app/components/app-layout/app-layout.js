import "./app-layout.scss";

import platformActions from "actions/platform-actions";
import Header from "components/header/header";
import React, { Component } from "react";
import { connect } from "react-redux";

class AppLayout extends Component {
  componentDidMount() {
    this.props.fetchPlatformSettings();
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <Header />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    fetchPlatformSettings: () => dispatch(platformActions.fetchPlatformSettings)
  }),
  null,
  { pure: false }
)(AppLayout);
