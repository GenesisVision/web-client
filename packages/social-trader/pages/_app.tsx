import "cropperjs/dist/cropper.css";
import withHistoryProvider from "decorators/history-provider/with-history-provider";
import withReduxStore from "decorators/with-redux-store";
import { appWithTranslation } from "i18n";
import App from "next/app";
import "pages/landing-page/styles/home.scss";
import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";
import "rc-slider/assets/index.css";
import "shared/styles/index.scss";
import React from "react";
import { Provider } from "react-redux";
import { compose, Store } from "redux";
import { initializeStore } from "store";

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

export default compose(
  withHistoryProvider,
  appWithTranslation,
  withReduxStore(initializeStore)
)(CustomApp);

interface Props {
  reduxStore: Store;
}
