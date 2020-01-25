import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export class CustomHead extends Head {
  getCssLinks(): JSX.Element[] | null {
    const { assetPrefix, files } = this.context._documentProps;
    const cssFiles =
      files && files.length ? files.filter(f => /\.css$/.test(f)) : [];
    const cssLinkElements: JSX.Element[] = [];
    cssFiles.forEach(file => {
      cssLinkElements.push(
        <link
          key={`${file}-preload`}
          nonce={this.props.nonce}
          rel="preload"
          href={`${assetPrefix}/_next/${encodeURI(file)}`}
          as="style"
          // @ts-ignore
          crossOrigin={this.props.crossOrigin || process.crossOrigin}
        />
      );
    });

    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }
}

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <CustomHead>
          <link rel="icon" sizes="192x192" href="/icon.png" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" content="#131e26" />
          <script
            dangerouslySetInnerHTML={{
              __html: `var env = '${process.env.NODE_ENV}';if (env === 'production'){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NJLM6BD');}`
            }}
          />
        </CustomHead>
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
