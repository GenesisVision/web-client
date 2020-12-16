import withHistoryProvider from "decorators/history-provider/with-history-provider";
import { appWithTranslation } from "i18n";
import App from "next/app";
import "pages/landing-page/styles/index.scss";
import React from "react";
import { compose, Store } from "redux";
import { createGlobalStyle } from "styled-components";
import { RootStyle } from "styles/root-styles";

interface Props {
  reduxStore: Store;
}

const GlobalStyle = createGlobalStyle`
  ${RootStyle}
`;

if (process.env.APP_VERSION) console.log(process.env.APP_VERSION);

class CustomApp extends App<Props> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
        <GlobalStyle />
      </>
    );
  }
}

export default compose(withHistoryProvider, appWithTranslation)(CustomApp);
