import Page from "components/page/page";
import React from "react";

const _InvestmentsPage: React.FC = () => {
  return <Page title={""}>Investment</Page>;
};

const InvestmentsPage = React.memo(_InvestmentsPage);
export default InvestmentsPage;
