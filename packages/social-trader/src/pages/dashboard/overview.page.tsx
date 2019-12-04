import Page from "components/page/page";
import React from "react";

const _OverviewPage: React.FC = () => {
  return <Page title={""}>Overview</Page>;
};

const OverviewPage = React.memo(_OverviewPage);
export default OverviewPage;
