import { useRefLink } from "hooks/ref-link";
import Head from "next/head";
import React from "react";
import CookieMessage from "routes/ssr/landing-page/components/cookie-message/cookie-message";
import LPFooter from "routes/ssr/landing-page/components/lp-footer/lp-footer";
import LPHeader from "routes/ssr/landing-page/components/lp-header/lp-header";
import {
  commonMeta,
  descriptionMeta,
  imageMeta,
  ORGANIZATION_SCHEMA,
  schema,
  titleMeta
} from "utils/seo";

const _Layout: React.FC<Props> = ({ title, children }) => {
  useRefLink();
  return (
    <div className="landing-page">
      <Head>
        <title>{title}</title>
        {schema([ORGANIZATION_SCHEMA])}
        {commonMeta()}
        <meta property="og:url" content="https://genesis.vision" />
        {imageMeta("https://genesis.vision/platform.png")}
        <meta property="og:image:type" content="image/png" />
        {titleMeta("Genesis Vision")}
        {descriptionMeta("Genesis Vision - Social Trading Platform")}
      </Head>
      <LPHeader />
      {children}
      <LPFooter />
      <CookieMessage />
      <div id="modal-root" />
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const Layout = React.memo(_Layout);
export default Layout;
