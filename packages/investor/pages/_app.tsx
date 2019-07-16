import "shared/styles/index.scss";

import { PlatformInfo } from "gv-api-web";
import App, { AppContext, Container } from "next/app";
import AppLayout from "pages/app/components/app-layout/app-layout";
import React from "react";
import { Provider } from "react-redux";
import { platformContext } from "shared/context/platform";
import { appWithTranslation } from "shared/i18n";
import platformApi from "shared/services/api-client/platform-api";
import store from "store";

class MyApp extends App<{
  info: PlatformInfo;
}> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const info = await platformApi.v10PlatformInfoGet();
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      info,
      pageProps
    };
  }
  render() {
    const { Component, pageProps, info } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <AppLayout>
            <platformContext.Provider value={info}>
              <Component {...pageProps} />
            </platformContext.Provider>
          </AppLayout>
        </Provider>
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
