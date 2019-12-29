import Head from "next/head";
import React from "react";
import LPFooter from "routes/ssr/landing-page/components/lp-footer/lp-footer";
import LPHeader from "routes/ssr/landing-page/components/lp-header/lp-header";
import { commonMeta, descriptionMeta, imageMeta, titleMeta } from "utils/seo";

const _Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="landing-page">
      <Head>
        <title>{title}</title>
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
      <div id="modal-root" />
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const Layout = React.memo(_Layout);
export default Layout;
