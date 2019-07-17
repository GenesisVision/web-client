import "shared/styles/index.scss";

import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { appWithTranslation } from "shared/i18n";
import store from "store";

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default appWithTranslation(CustomApp);
