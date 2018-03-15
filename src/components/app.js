import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import React from "react";

import AlertMessageList from "../shared/modules/alert-message/components/alert-message-list/alert-message-list";
import Header from "./header/header";
import history from "../utils/history";
import PopupContainer from "../modules/popup/components/popup-container";
import Sidebar from "./sidebar/sidebar";
import store from "../store/index";

import "./app.css";
import AppRoutes from "./app.routes";

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route component={Header} />
        <div className="app__main">
          <div className="app__sidebar">
            <Sidebar />
          </div>
          <div className="app__body">
            <AppRoutes />
          </div>
        </div>
        <div className="col-sm-2 offset-10 fixed-bottom">
          <AlertMessageList />
        </div>
        <PopupContainer />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
