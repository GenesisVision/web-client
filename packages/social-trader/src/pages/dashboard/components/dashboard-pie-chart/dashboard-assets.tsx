import DashboardPieChartBlock from "pages/dashboard/components/dashboard-pie-chart/dashboard-pie-chart-block";
import { assetsLoaderData } from "pages/dashboard/dashboard.loaders-data";
import { getAssetsPercents } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardAssets: React.FC<Props> = ({ landscapeTablet, tablet }) => {
  const [t] = useTranslation();
  return (
    <DashboardPieChartBlock
      landscapeTablet={landscapeTablet}
      tablet={tablet}
      label={t("dashboard-page:portfolio.title")}
      request={getAssetsPercents}
      loaderData={assetsLoaderData()}
    />
  );
};

interface Props {
  landscapeTablet?: boolean;
  tablet?: boolean;
}
const DashboardAssets = React.memo(_DashboardAssets);
export default DashboardAssets;
