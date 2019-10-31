import "shared/components/dashboard/dashboard.scss";

import React from "react";
import Page from "shared/components/page/page";

const _InvestmentsPage: React.FC = () => {
  return <Page title={""}>Investment</Page>;
};

const InvestmentsPage = React.memo(_InvestmentsPage);
export default InvestmentsPage;
