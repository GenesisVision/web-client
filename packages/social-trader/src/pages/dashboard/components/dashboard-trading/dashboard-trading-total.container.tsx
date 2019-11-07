import "./dashboard-trading.scss";

import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useApiRequest from "shared/hooks/api-request.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";

import { getTradingStatisticLoaderData } from "../../dashboard.loaders-data";
import { TDashboardTradingStatistic } from "../../dashboard.types";
import { getTotalTradingStatistic } from "../../services/dashboard.service";
import DashboardTradingTotal from "./dashboard-trading-total";

const _DashboardTradingTotalContainer: React.FC = () => {
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  const { data, sendRequest } = useApiRequest<TDashboardTradingStatistic>({
    request: getTotalTradingStatistic
  });
  useEffect(() => {
    sendRequest({ currency });
  }, []);
  return (
    <DashboardBlock
      label={t("dashboard-page.trading.total")}
      all={""}
      seeAll={false}
    >
      <DashboardTradingTotal
        currency={currency}
        loaderData={getTradingStatisticLoaderData()}
        data={data!}
      />
    </DashboardBlock>
  );
};

const DashboardTradingTotalContainer = React.memo(
  _DashboardTradingTotalContainer
);
export default DashboardTradingTotalContainer;
