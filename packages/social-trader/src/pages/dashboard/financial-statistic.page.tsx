import Page from "components/page/page";
import React from "react";

const _FinancialStatisticPage: React.FC = () => {
  return <Page title={""}>FinancialStatistic</Page>;
};

const FinancialStatisticPage = React.memo(_FinancialStatisticPage);
export default FinancialStatisticPage;
