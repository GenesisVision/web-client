import * as React from "react";
import DocumentTitle from "react-document-title";

import Header from "../components/header/header";

const _Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <DocumentTitle title={title}>
      <>
        <Header />
        {children}
      </>
    </DocumentTitle>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const Layout = React.memo(_Layout);
export default Layout;
