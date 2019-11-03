import DashboardStatisticContainer from "pages/dashboard/components/dashboard-statistic/dashboard-statistic.container";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import {
  TDashboardInvestingStatistic,
  TDashboardProgramsStatistic
} from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";

import { getTotalInvestingStatistic } from "../../services/dashboard.service";

const _DashboardInvestingStatistic: React.FC<Props> = () => {
  const [t] = useTranslation();
  return (
    <DashboardStatisticContainer
      label={t("dashboard-page.statistic.investing")}
      request={getTotalInvestingStatistic}
      renderValues={({
        balance,
        programs,
        funds
      }: TDashboardInvestingStatistic) => (
        <>
          <DashboardValueItem
            label={t("dashboard-page.statistic.balance")}
            value={balance}
            currency={"GVT"}
          />
          <DashboardValueItem
            label={t("dashboard-page.statistic.programs")}
            value={programs}
            currency={"GVT"}
          />
          <DashboardValueItem
            label={t("dashboard-page.statistic.funds")}
            value={funds}
            currency={"GVT"}
          />
        </>
      )}
    />
  );
};

interface Props {}

const DashboardInvestingStatistic = React.memo(_DashboardInvestingStatistic);
export default DashboardInvestingStatistic;
