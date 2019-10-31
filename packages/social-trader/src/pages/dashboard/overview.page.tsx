import "shared/components/dashboard/dashboard.scss";

import React from "react";
import Page from "shared/components/page/page";

const _OverviewPage: React.FC = () => {
  return <Page title={""}>Overview</Page>;
};

const OverviewPage = React.memo(_OverviewPage);
export default OverviewPage;
