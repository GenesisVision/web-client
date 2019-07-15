import "shared/styles/index.scss";

import App, { Container } from "next/app";
import AppLayout from "pages/app/components/app-layout/app-layout";
import React from "react";
import { Provider } from "react-redux";
import { appWithTranslation } from "shared/i18n";
import store from "store";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Provider>
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
