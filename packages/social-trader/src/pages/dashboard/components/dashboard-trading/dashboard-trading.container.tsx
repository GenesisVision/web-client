import "./dashboard-trading.scss";

import DashboardPrivate from "pages/dashboard/components/dashboard-trading/dashboard-pirvate";
import DashboardPublic from "pages/dashboard/components/dashboard-trading/dashboard-public";
import DashboardTradingTotal from "pages/dashboard/components/dashboard-trading/dashboard-trading-total";
import {
  getTradingPublicLoaderData,
  getTradingTotalLoaderData
} from "pages/dashboard/dashboard.loaders-data";
import { TTrading } from "pages/dashboard/dashboard.types";
import { getTradingData } from "pages/dashboard/services/dashboard.service";
import React, { useEffect } from "react";
import useApiRequest from "shared/hooks/api-request.hook";

const _DashboardTradingContainer: React.FC = () => {
  const { data, sendRequest } = useApiRequest<TTrading>({
    request: getTradingData
  });
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <>
      <div>
        <DashboardTradingTotal
          loaderData={getTradingTotalLoaderData()}
          data={(data && data.total)!}
        />
      </div>
      <div>
        <DashboardPublic />
      </div>
      <div>
        <DashboardPrivate />
      </div>
    </>
  );
};

const DashboardTradingContainer = React.memo(_DashboardTradingContainer);
export default DashboardTradingContainer;
