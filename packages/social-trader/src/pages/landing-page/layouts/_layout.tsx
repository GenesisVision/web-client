import { useRefLink } from "hooks/ref-link";
import Head from "next/head";
import CookieMessage from "pages/landing-page/components/cookie-message/cookie-message";
import LPFooter from "pages/landing-page/components/lp-footer/lp-footer";
import LPHeader from "pages/landing-page/components/lp-header/lp-header";
import React from "react";
import {
  commonMeta,
  descriptionMeta,
  imageMeta,
  ORGANIZATION_SCHEMA,
  schema,
  titleMeta
} from "utils/seo";

const _Layout: React.FC<Props> = ({ description, title, children }) => {
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
        {descriptionMeta(
          description || "Genesis Vision - Social Trading Platform"
        )}
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
  description?: string;
  title: string;
}

const Layout = React.memo(_Layout);
export default Layout;
