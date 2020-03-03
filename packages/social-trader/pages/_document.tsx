import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style>{"body, a, a:visited {color: white}"}</style>
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
        </Head>
        <body>
          <Main />
          <NextScript />
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
