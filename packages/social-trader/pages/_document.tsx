import { DocumentContext } from "next/dist/next-server/lib/utils";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";
import { VERSION_ID } from "utils/version";

import CustomHead from "./head-custom";
import CustomNextScript from "./next-script-custom";

const isProd = process.env.NODE_ENV === "production";

const HACKED_PAGES: string[] = [];

class MyDocument extends Document<{ pathname: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        pathname: ctx.pathname,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const isHackedPage = HACKED_PAGES.includes(this.props.pathname) && isProd;
    const HeadElement = isHackedPage ? CustomHead : Head;
    const NextScriptElement = isHackedPage ? CustomNextScript : NextScript;
    return (
      <Html lang="en">
        <HeadElement>
          <link
            as="style"
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Montserrat:200,400,500,600,700,800&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Montserrat:200,400,500,600,700,800&display=swap"
          />
          <link rel="icon" sizes="192x192" href="/icon.png" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" content="#131e26" />
          <script
            dangerouslySetInnerHTML={{
              __html: `var env = '${process.env.NODE_ENV}';var hostname = '${process.env.HOSTNAME}';if (env === 'production' && hostname === 'https://genesis.vision'){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NJLM6BD');}`
            }}
          />
        </HeadElement>
        <body>
          {process.env.APP_VERSION && (
            <div
              id={VERSION_ID}
              data-version={process.env.APP_VERSION}
              style={{ display: "none" }}
            />
          )}
          <Main />
          <NextScriptElement />
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NJLM6BD"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
