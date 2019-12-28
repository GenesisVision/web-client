import Head from "next/head";
import React from "react";
import LPFooter from "routes/ssr/landing-page/components/lp-footer/lp-footer";
import LPHeader from "routes/ssr/landing-page/components/lp-header/lp-header";

const _Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="landing-page">
      <Head>
        <title>{title}</title>
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
