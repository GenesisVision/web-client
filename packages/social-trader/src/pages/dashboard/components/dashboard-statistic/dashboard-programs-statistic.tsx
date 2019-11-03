import DashboardStatisticContainer from "pages/dashboard/components/dashboard-statistic/dashboard-statistic.container";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import { TDashboardProgramsStatistic } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";

import { getTotalProgramStatistic } from "../../services/dashboard.service";

const _DashboardProgramsStatistic: React.FC<Props> = () => {
  const [t] = useTranslation();
  return (
    <DashboardStatisticContainer
      label={t("dashboard-page.statistic.programs")}
      request={getTotalProgramStatistic}
      renderValues={({ equity, AUM }: TDashboardProgramsStatistic) => (
        <>
          <DashboardValueItem
            label={t("dashboard-page.statistic.equity")}
            value={equity}
            currency={"GVT"}
          />
          <DashboardValueItem
            label={t("dashboard-page.statistic.AUM")}
            value={AUM}
            currency={"GVT"}
          />
        </>
      )}
    />
  );
};

interface Props {}

const DashboardProgramsStatistic = React.memo(_DashboardProgramsStatistic);
export default DashboardProgramsStatistic;
