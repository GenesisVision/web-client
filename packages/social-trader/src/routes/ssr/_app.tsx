import "shared/styles/index.scss";

import withHistoryProvider from "decorators/history-provider/with-history-provider";
import withReduxStore from "decorators/with-redux-store";
import { appWithTranslation } from "i18n";
import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { compose, Store } from "redux";
import { InitializeStoreType } from "utils/types";

export const _AppCreator = (initializeStore: InitializeStoreType) => {
  class CustomApp extends App<Props> {
    render() {
      const { Component, pageProps, reduxStore } = this.props;
      return (
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      );
    }
  }

  return compose(
    withHistoryProvider,
    appWithTranslation,
    withReduxStore(initializeStore)
  )(CustomApp);
};

interface Props {
  reduxStore: Store;
}
