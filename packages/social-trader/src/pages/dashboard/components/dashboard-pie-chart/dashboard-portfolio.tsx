import DashboardPieChartBlock from "pages/dashboard/components/dashboard-pie-chart/dashboard-pie-chart-block";
import { portfolioLoaderData } from "pages/dashboard/dashboard.loaders-data";
import { getPortfolio } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardPortfolio: React.FC<Props> = ({ landscapeTablet, tablet }) => {
  const [t] = useTranslation();
  return (
    <DashboardPieChartBlock
      landscapeTablet={landscapeTablet}
      tablet={tablet}
      label={t("dashboard-page.assets.title")}
      request={getPortfolio}
      loaderData={portfolioLoaderData()}
    />
  );
};

interface Props {
  landscapeTablet?: boolean;
  tablet?: boolean;
}

const DashboardPortfolio = React.memo(_DashboardPortfolio);
export default DashboardPortfolio;
