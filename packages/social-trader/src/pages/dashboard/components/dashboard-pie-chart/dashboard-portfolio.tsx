import { DashboardBlockOrientation } from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardPieChartBlock from "pages/dashboard/components/dashboard-pie-chart/dashboard-pie-chart-block";
import { portfolioLoaderData } from "pages/dashboard/dashboard.loaders-data";
import { getPortfolio } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  orientation?: DashboardBlockOrientation;
}

const _DashboardPortfolio: React.FC<Props> = ({ orientation }) => {
  const [t] = useTranslation();
  return (
    <DashboardPieChartBlock
      name={"DashboardPortfolio"}
      orientation={orientation}
      label={t("dashboard-page:assets.title")}
      request={getPortfolio}
      loaderData={portfolioLoaderData()}
    />
  );
};

const DashboardPortfolio = React.memo(_DashboardPortfolio);
export default DashboardPortfolio;
