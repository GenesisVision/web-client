import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING
} from "pages/dashboard/dashboard.constants";
import { TAsset } from "pages/dashboard/dashboard.types";
import { getPublicAssets } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardPublic: React.FC<Props> = () => {
  const [t] = useTranslation();
  return (
    <DashboardTradingTable
      getItems={getPublicAssets}
      defaultFilters={DASHBOARD_PUBLIC_DEFAULT_FILTERS}
      filtering={DASHBOARD_PUBLIC_FILTERING}
      title={t("dashboard-page.trading.public")}
      renderBodyCard={(asset: TAsset) => <DashboardPublicCard asset={asset} />}
    />
  );
};

interface Props {}

const DashboardPublic = React.memo(_DashboardPublic);
export default DashboardPublic;
