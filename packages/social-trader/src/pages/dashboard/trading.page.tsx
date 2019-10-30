import "shared/components/dashboard/dashboard.scss";

import React from "react";
import Page from "shared/components/page/page";

const _TradingPage: React.FC = () => {
  return <Page title={""}>Trading</Page>;
};

const TradingPage = React.memo(_TradingPage);
export default TradingPage;
