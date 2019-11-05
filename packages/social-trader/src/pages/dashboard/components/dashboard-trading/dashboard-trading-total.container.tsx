import "./dashboard-trading.scss";

import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useApiRequest from "shared/hooks/api-request.hook";

import { getTradingTotalLoaderData } from "../../dashboard.loaders-data";
import { TTrading } from "../../dashboard.types";
import { getTradingData } from "../../services/dashboard.service";
import DashboardTradingTotal from "./dashboard-trading-total";

const _DashboardTradingTotalContainer: React.FC = () => {
  const [t] = useTranslation();
  const { data, sendRequest } = useApiRequest<TTrading>({
    request: getTradingData
  });
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <DashboardBlock
      label={t("dashboard-page.trading.total")}
      all={""}
      seeAll={false}
    >
      <DashboardTradingTotal
        loaderData={getTradingTotalLoaderData()}
        data={(data && data.total)!}
      />
    </DashboardBlock>
  );
};

const DashboardTradingTotalContainer = React.memo(
  _DashboardTradingTotalContainer
);
export default DashboardTradingTotalContainer;
