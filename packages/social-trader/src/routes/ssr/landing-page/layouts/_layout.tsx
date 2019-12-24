import React from "react";
import DocumentTitle from "react-document-title";
import LPFooter from "routes/ssr/landing-page/components/lp-footer/lp-footer";
import LPHeader from "routes/ssr/landing-page/components/lp-header/lp-header";

const _Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <DocumentTitle title={title}>
      <>
        <LPHeader />
        {children}
        <LPFooter />
      </>
    </DocumentTitle>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const Layout = React.memo(_Layout);
export default Layout;
