import { Center } from "components/center/center";
import { DataStorageContext } from "components/data-storage/data-storage";
import { RowItem } from "components/row-item/row-item";
import { ToolbarButton } from "components/table/components/toolbar-button";
import { DashboardTradingAsset } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import { CREATE_PROGRAM_PAGE_ROUTE } from "pages/create-program/create-program.constants";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING
} from "pages/dashboard/dashboard.constants";
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
      filtering={DASHBOARD_PUBLIC_FILTERING}
      defaultFilters={DASHBOARD_PUBLIC_DEFAULT_FILTERS}
      createButtonToolbar={
        <Center>
          <RowItem>
            <ToolbarButton
              text={t("buttons.create-fund")}
              tooltipContent={
                <>
                  {t("buttons.tooltips.create-fund-1")}<br />
                  {t("buttons.tooltips.create-fund-2")}<br />
                  {t("buttons.tooltips.create-fund-3")}<br />
                  {t("buttons.tooltips.create-fund-4")}<br />
                </>
              }
              route={CREATE_FUND_PAGE_ROUTE}
            />
          </RowItem>
          <RowItem>
            <ToolbarButton
              text={t("buttons.create-program")}
              tooltipContent={
                <>
                  {t("buttons.tooltips.create-program-1")}<br />
                  {t("buttons.tooltips.create-program-2")}<br />
                  {t("buttons.tooltips.create-program-3")}<br />
                  {t("buttons.tooltips.create-program-4")}<br />
                </>
              }
              route={CREATE_PROGRAM_PAGE_ROUTE}
            />
          </RowItem>
        </Center>
      }
      getItems={getItems}
      title={t("dashboard-page:trading.public")}
      renderBodyCard={(
        asset: DashboardTradingAsset,
        updateRow,
        updateItems
      ) => (
        <DashboardPublicCard
          showActions={asset.accountInfo.status !== "Disabled"}
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
