import { ATTACH_ACCOUNT_PAGE_ROUTE } from "pages/attach-account/attach-account.constants";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import DashboardPrivateCard from "pages/dashboard/components/dashboard-trading/dashboard-private-card";
import DashboardTradingTable, {
  CreateButtonToolbar
} from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING
} from "pages/dashboard/dashboard.constants";
import { TAsset } from "pages/dashboard/dashboard.types";
import { getPrivateAssets } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardPrivate: React.FC<Props> = () => {
  const [t] = useTranslation();
  return (
    <DashboardTradingTable
      createButtonToolbar={
        <>
          <CreateButtonToolbar
            text={t("buttons.create-account")}
            route={CREATE_ACCOUNT_PAGE_ROUTE}
          />
          <CreateButtonToolbar
            text={t("buttons.attach-external-account")}
            route={ATTACH_ACCOUNT_PAGE_ROUTE}
          />
        </>
      }
      getItems={getPrivateAssets}
      defaultFilters={DASHBOARD_PUBLIC_DEFAULT_FILTERS}
      filtering={DASHBOARD_PUBLIC_FILTERING}
      title={t("dashboard-page.trading.private")}
      renderBodyCard={(asset: TAsset) => (
        <DashboardPrivateCard title={""} asset={asset} />
      )}
    />
  );
};

interface Props {}

const DashboardPrivate = React.memo(_DashboardPrivate);
export default DashboardPrivate;
