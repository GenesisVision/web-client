import { DashboardTradingAsset } from "gv-api-web";
import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import DashboardTradingTable, {
  CreateButtonToolbar
} from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
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
      createButtonToolbar={
        <CreateButtonToolbar
          text={t("buttons.create-fund")}
          route={CREATE_FUND_PAGE_ROUTE}
        />
      }
      getItems={getPublicAssets}
      defaultFilters={DASHBOARD_PUBLIC_DEFAULT_FILTERS}
      filtering={DASHBOARD_PUBLIC_FILTERING}
      title={t("dashboard-page.trading.public")}
      renderBodyCard={(asset: DashboardTradingAsset) => (
        <DashboardPublicCard asset={asset} />
      )}
    />
  );
};

interface Props {}

const DashboardPublic = React.memo(_DashboardPublic);
export default DashboardPublic;
