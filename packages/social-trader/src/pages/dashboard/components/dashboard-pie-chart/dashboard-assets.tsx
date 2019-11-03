import DashboardPieChartBlock from "pages/dashboard/components/dashboard-pie-chart/dashboard-pie-chart-block";
import { assetsLoaderData } from "pages/dashboard/dashboard.loaders-data";
import {
  getAssetsPercents,
  getPortfolio
} from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardAssets = () => {
  const [t] = useTranslation();
  return (
    <DashboardPieChartBlock
      label={t("dashboard-page.portfolio.title")}
      request={getAssetsPercents}
      loaderData={assetsLoaderData()}
    />
  );
};

const DashboardAssets = React.memo(_DashboardAssets);
export default DashboardAssets;
