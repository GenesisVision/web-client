import DashboardStatisticContainer from "pages/dashboard/components/dashboard-statistic/dashboard-statistic.container";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import { TDashboardTradingStatistic } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "shared/reducers/account-settings-reducer";

import { getTotalTradingStatistic } from "../../services/dashboard.service";

const _DashboardTradingStatistic: React.FC<Props> = () => {
  const [t] = useTranslation();
  const currency = useSelector(currencySelector);
  return (
    <DashboardStatisticContainer
      currency={currency}
      label={t("dashboard-page.statistic.programs")}
      request={getTotalTradingStatistic}
      renderValues={({
        equity,
        assetsUnderManagement
      }: TDashboardTradingStatistic) => (
        <>
          <DashboardValueItem
            label={t("dashboard-page.statistic.equity")}
            value={equity}
            currency={currency}
          />
          <DashboardValueItem
            label={t("dashboard-page.statistic.AUM")}
            value={assetsUnderManagement}
            currency={currency}
          />
        </>
      )}
    />
  );
};

interface Props {}

const DashboardTradingStatistic = React.memo(_DashboardTradingStatistic);
export default DashboardTradingStatistic;
