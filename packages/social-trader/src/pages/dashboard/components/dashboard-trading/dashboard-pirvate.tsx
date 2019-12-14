import { ToolbarButton } from "components/table/components/toolbar-button";
import { DashboardTradingAsset } from "gv-api-web";
import { ATTACH_ACCOUNT_PAGE_ROUTE } from "pages/attach-account/attach-account.constants";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import DashboardPrivateCard from "pages/dashboard/components/dashboard-trading/dashboard-private-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING
} from "pages/dashboard/dashboard.constants";
import { getPrivateAssets } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardPrivate: React.FC = () => {
  const [t] = useTranslation();
  return (
    <DashboardTradingTable
      createButtonToolbar={
        <>
          <ToolbarButton
            text={t("buttons.create-account")}
            route={CREATE_ACCOUNT_PAGE_ROUTE}
          />
          <ToolbarButton
            text={t("buttons.attach-external-account")}
            route={ATTACH_ACCOUNT_PAGE_ROUTE}
          />
        </>
      }
      getItems={getPrivateAssets}
      defaultFilters={DASHBOARD_PUBLIC_DEFAULT_FILTERS}
      filtering={DASHBOARD_PUBLIC_FILTERING}
      title={t("dashboard-page.trading.private")}
      renderBodyCard={(
        asset: DashboardTradingAsset,
        updateRow,
        updateItems
      ) => <DashboardPrivateCard updateItems={updateItems!} asset={asset} />}
    />
  );
};

const DashboardPrivate = React.memo(_DashboardPrivate);
export default DashboardPrivate;
