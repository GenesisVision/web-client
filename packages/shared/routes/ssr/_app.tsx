import "shared/styles/index.scss";

import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { Store, compose } from "redux";
import withHistoryProvider from "shared/decorators/history-provider/with-history-provider";
import withReduxStore from "shared/decorators/with-redux-store";
import { appWithTranslation } from "shared/i18n";
import { InitializeStoreType } from "shared/utils/types";

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
