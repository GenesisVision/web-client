import { DataStorageContext } from "components/data-storage/data-storage";
import { ToolbarButton } from "components/table/components/toolbar-button";
import { DashboardTradingAsset } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import { getPublicAssets } from "pages/dashboard/services/dashboard.service";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

const _DashboardPublic: React.FC<Props> = () => {
  const { updateData } = useContext(DataStorageContext);
  const [t] = useTranslation();
  const showIn = useAccountCurrency();
  const getItems = useCallback(filters => {
    return getPublicAssets({
      ...filters,
      showIn
    });
  }, []);
  const handleUpdateItems = useCallback(
    updateItems => () => {
      updateData();
      updateItems();
    },
    []
  );
  return (
    <DashboardTradingTable
      createButtonToolbar={
        <ToolbarButton
          text={t("buttons.create-fund")}
          route={CREATE_FUND_PAGE_ROUTE}
        />
      }
      getItems={getItems}
      title={t("dashboard-page.trading.public")}
      renderBodyCard={(
        asset: DashboardTradingAsset,
        updateRow,
        updateItems
      ) => (
        <DashboardPublicCard
          asset={asset}
          updateItems={handleUpdateItems(updateItems!)}
          ownAsset
        />
      )}
    />
  );
};

interface Props {}

const DashboardPublic = React.memo(_DashboardPublic);
export default DashboardPublic;
