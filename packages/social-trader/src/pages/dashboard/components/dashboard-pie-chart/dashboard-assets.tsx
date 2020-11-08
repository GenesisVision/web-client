import { DashboardBlockOrientation } from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardPieChartBlock from "pages/dashboard/components/dashboard-pie-chart/dashboard-pie-chart-block";
import { assetsLoaderData } from "pages/dashboard/dashboard.loaders-data";
import { getAssetsPercents } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  orientation?: DashboardBlockOrientation;
}

const _DashboardAssets: React.FC<Props> = ({ orientation }) => {
  const [t] = useTranslation();
  return (
    <DashboardPieChartBlock
      name={"DashboardAssets"}
      orientation={orientation}
      label={t("dashboard-page:portfolio.title")}
      request={getAssetsPercents}
      loaderData={assetsLoaderData()}
    />
  );
};

const DashboardAssets = React.memo(_DashboardAssets);
export default DashboardAssets;
