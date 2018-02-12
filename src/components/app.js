import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import React from "react";

import AlertMessageList from "../shared/modules/alert-message/components/alert-message-list/alert-message-list";
import Header from "./header/header";
import history from "../utils/history";
import Sidebar from "./sidebar/sidebar";
import store from "../store/index";

import AppRoutes from "./app.routes";

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route component={Header} />
        <div className="container-fluid">
          <div className="row">
            <Sidebar className="col-md-2 d-md-block" />
            <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <AppRoutes />
            </main>
          </div>
          <div className="col-sm-2 offset-10 fixed-bottom">
            <AlertMessageList />
          </div>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
