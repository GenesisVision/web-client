import { $textDarkColor } from "components/gv-styles/gv-colors/gv-colors";
import withHistoryProvider from "decorators/history-provider/with-history-provider";
import withToken from "decorators/with-token";
import { appWithTranslation } from "i18n";
import App from "next/app";
import "pages/landing-page/styles/index.scss";
import React from "react";
import { compose, Store } from "redux";
import "styles/index.scss";

class CustomApp extends App<Props> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
        <style global jsx>{`
          :root {
            --scroll-width: 6px;
            --scroll-radius: calc(var(--scroll-width) / 2);
            --scroll-background: transparent;
            --scroll-thumb-color: ${$textDarkColor};
          }
          ::-webkit-scrollbar {
            width: var(--scroll-width);
            height: var(--scroll-width);
          }

          ::-webkit-scrollbar-track {
            background: var(--scroll-background);
          }

          ::-webkit-scrollbar-thumb {
            background: var(--scroll-thumb-color);
            border-radius: var(--scroll-radius);
          }

          ::-webkit-scrollbar-corner {
            background: var(--scroll-background);
          }

          * {
            scrollbar-width: thin;
            scrollbar-color: var(--scroll-thumb-color) var(--scroll-background);
          }
        `}</style>
      </>
    );
  }
}

export default compose(
  withHistoryProvider,
  appWithTranslation,
  withToken
)(CustomApp);

interface Props {
  reduxStore: Store;
}
