import { ToolbarButton } from "components/table/components/toolbar-button";
import { DashboardTradingAsset } from "gv-api-web";
import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING
} from "pages/dashboard/dashboard.constants";
import { getPublicAssets } from "pages/dashboard/services/dashboard.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _DashboardPublic: React.FC<Props> = () => {
  const [t] = useTranslation();
  const showIn = useSelector(currencySelector);
  const getItems = useCallback(filters => {
    return getPublicAssets({
      ...filters,
      showIn
    });
  }, []);
  return (
    <DashboardTradingTable
      createButtonToolbar={
        <ToolbarButton
          text={t("buttons.create-fund")}
          route={CREATE_FUND_PAGE_ROUTE}
        />
      }
      getItems={getItems}
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
