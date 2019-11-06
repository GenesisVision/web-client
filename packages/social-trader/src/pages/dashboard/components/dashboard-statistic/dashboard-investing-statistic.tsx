import DashboardStatisticContainer from "pages/dashboard/components/dashboard-statistic/dashboard-statistic.container";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import { TDashboardInvestingStatistic } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "shared/reducers/account-settings-reducer";

import { getTotalInvestingStatistic } from "../../services/dashboard.service";

const _DashboardInvestingStatistic: React.FC<Props> = () => {
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  return (
    <DashboardStatisticContainer
      currency={currency}
      label={t("dashboard-page.statistic.investing")}
      request={getTotalInvestingStatistic}
      renderValues={({
        fundsCount,
        programsCount,
        equity
      }: TDashboardInvestingStatistic) => (
        <>
          <DashboardValueItem
            label={t("dashboard-page.statistic.balance")}
            value={equity}
            currency={currency}
          />
          <DashboardValueItem
            label={t("dashboard-page.statistic.programs")}
            value={programsCount}
            currency={currency}
          />
          <DashboardValueItem
            label={t("dashboard-page.statistic.funds")}
            value={fundsCount}
            currency={currency}
          />
        </>
      )}
    />
  );
};

interface Props {}

const DashboardInvestingStatistic = React.memo(_DashboardInvestingStatistic);
export default DashboardInvestingStatistic;
