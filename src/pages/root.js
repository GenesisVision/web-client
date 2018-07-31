import "./root.scss";

import { deinitHeaderInfo, initHeaderInfo } from "actions/header-info-actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import platformActions from "../actions/platform-actions";
import store from "../store/index";
import history from "../utils/history";
import RootRoutes from "./root.routes";

class Root extends Component {
  componentDidMount() {
    this.props.fetchPlatformSettings();
    this.props.initHeaderInfo();

    setTimeout(() => {
      deinitHeaderInfo();
    }, 5000);
  }
  render() {
    return <RootRoutes />;
  }
}

const RootContainer = connect(
  null,
  dispatch => ({
    fetchPlatformSettings: () =>
      dispatch(platformActions.fetchPlatformSettings),
    initHeaderInfo: () => dispatch(initHeaderInfo())
  }),
  null,
  { pure: false }
)(Root);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootContainer />
    </ConnectedRouter>
  </Provider>
);

export default App;
