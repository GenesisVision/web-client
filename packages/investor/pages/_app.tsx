import "shared/styles/index.scss";

import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { Store, compose } from "redux";
import { appWithTranslation } from "shared/i18n";

import { initializeStore } from "../src/store";
import withReduxStore from "../with-redux-store";

class CustomApp extends App<Props> {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default compose(
  appWithTranslation,
  withReduxStore(initializeStore)
)(CustomApp);

interface Props {
  reduxStore: Store;
}
