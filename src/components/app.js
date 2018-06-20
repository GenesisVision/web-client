import { connect } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import React, { Component } from "react";

import AlertMessageList from "../shared/modules/alert-message/components/alert-message-list/alert-message-list";
import Header from "./header/header";
import history from "../utils/history";
import platformActions from "../actions/platform-actions";
import PopupContainer from "../modules/popup/components/popup-container";
import store from "../store/index";
import MobileNavContainer from "../modules/navigation/components/mobile-nav/mobile-nav-container";
import "./app.css";
import AppRoutes from "./app.routes";

class AppContainer extends Component {
  componentDidMount() {
    this.props.fetchPlatformSettings();
  }
  render() {
    return (
      <div className="app">
        <Route component={Header} />
        <MobileNavContainer />
        <div className="app__body">
          <AppRoutes />
        </div>
        <AlertMessageList />
        <PopupContainer />
      </div>
    );
  }
}

AppContainer = connect(
  null,
  dispatch => ({
    fetchPlatformSettings: () => dispatch(platformActions.fetchPlatformSettings)
  }),
  null,
  { pure: false }
)(AppContainer);

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer />
    </ConnectedRouter>
  </Provider>
);

export default Root;
