import "./dashboard-trading.scss";

import useApiRequest from "hooks/api-request.hook";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

import { getTradingStatisticLoaderData } from "../../dashboard.loaders-data";
import { TDashboardTradingStatistic } from "../../dashboard.types";
import { getTotalTradingStatistic } from "../../services/dashboard.service";
import DashboardTradingTotal from "./dashboard-trading-total";

const _DashboardTradingTotalContainer: React.FC = () => {
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  const { data } = useApiRequest<TDashboardTradingStatistic>({
    fetchOnMount: true,
    fetchOnMountData: { currency },
    request: getTotalTradingStatistic
  });
  return (
    <DashboardBlock label={t("dashboard-page.trading.total")}>
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
