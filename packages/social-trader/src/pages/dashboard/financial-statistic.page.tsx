import "shared/components/dashboard/dashboard.scss";

import React from "react";
import Page from "shared/components/page/page";

const _FinancialStatisticPage: React.FC = () => {
  return <Page title={""}>FinancialStatistic</Page>;
};

const FinancialStatisticPage = React.memo(_FinancialStatisticPage);
export default FinancialStatisticPage;
