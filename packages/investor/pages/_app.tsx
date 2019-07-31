import "shared/styles/index.scss";

import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { compose, Store } from "redux";
import withHistoryProvider from "shared/decorators/history-provider/with-history-provider";
import withReduxStore from "shared/decorators/with-redux-store";
import { appWithTranslation } from "shared/i18n";

import { initializeStore } from "../src/store";

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
  withHistoryProvider,
  appWithTranslation,
  withReduxStore(initializeStore)
)(CustomApp);

interface Props {
  reduxStore: Store;
}
