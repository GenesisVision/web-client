import { DataStorageContext } from "components/data-storage/data-storage";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { Row } from "components/row/row";
import { ToolbarButton } from "components/table/components/toolbar-button";
import { DashboardTradingAsset } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useTab from "hooks/tab.hook";
import { ATTACH_ACCOUNT_PAGE_ROUTE } from "pages/attach-account/attach-account.constants";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import { CREATE_SELF_MANAGED_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardPrivateCard from "pages/dashboard/components/dashboard-trading/dashboard-private-card/dashboard-private-card";
import DashboardPrivateTable from "pages/dashboard/components/dashboard-trading/dashboard-private-table";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING
} from "pages/dashboard/dashboard.constants";
import {
  getPrivateAssets,
  getSelfManagedFunds
} from "pages/dashboard/services/dashboard.service";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

enum TABS {
  ACCOUNTS = "ACCOUNTS",
  SELF_MANAGED_FUNDS = "SELF_MANAGED_FUNDS"
}

const TableTab: React.FC<{ selected?: boolean }> = ({ selected, children }) => {
  return <div style={{ display: selected ? "block" : "none" }}>{children}</div>;
};

const _DashboardPrivate: React.FC = () => {
  const showIn = useAccountCurrency();
  const { tab, setTab } = useTab<TABS>(TABS.ACCOUNTS);
  const { updateData } = useContext(DataStorageContext);
  const [t] = useTranslation();
  const handleUpdateItems = useCallback(
    updateItems => () => {
      updateData();
      updateItems();
    },
    []
  );

  const tabs = (
    <GVTabs value={tab} onChange={setTab}>
      <GVTab
        value={TABS.ACCOUNTS}
        label={t("dashboard-page:trading.tabs.accounts")}
      />
      <GVTab
        value={TABS.SELF_MANAGED_FUNDS}
        label={t("dashboard-page:trading.tabs.self-managed-funds")}
      />
    </GVTabs>
  );

  return (
    <DashboardBlock label={t("dashboard-page:trading.private")}>
      <TableTab selected={tab === TABS.ACCOUNTS}>
        <DashboardPrivateTable
          name={"getPrivateAssets"}
          filtering={DASHBOARD_PUBLIC_FILTERING}
          defaultFilters={DASHBOARD_PUBLIC_DEFAULT_FILTERS}
          createButtonToolbar={
            <Row>
              <ToolbarButton
                text={t("buttons.create-account")}
                route={CREATE_ACCOUNT_PAGE_ROUTE}
              />
              <ToolbarButton
                text={t("buttons.attach-external-account")}
                route={ATTACH_ACCOUNT_PAGE_ROUTE}
              />
            </Row>
          }
          getItems={getPrivateAssets}
          title={tabs}
          renderBodyCard={(
            asset: DashboardTradingAsset,
            updateRow,
            updateItems
          ) => (
            <DashboardPrivateCard
              updateItems={handleUpdateItems(updateItems!)}
              asset={asset}
            />
          )}
        />
      </TableTab>
      <TableTab selected={tab === TABS.SELF_MANAGED_FUNDS}>
        <DashboardPrivateTable
          name={"getSelfManagedFunds"}
          filtering={DASHBOARD_PUBLIC_FILTERING}
          defaultFilters={DASHBOARD_PUBLIC_DEFAULT_FILTERS}
          createButtonToolbar={
            <ToolbarButton
              text={t("buttons.create-self-managed-fund")}
              route={CREATE_SELF_MANAGED_FUND_PAGE_ROUTE}
            />
          }
          getItems={getSelfManagedFunds(showIn)}
          title={tabs}
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
      </TableTab>
    </DashboardBlock>
  );
};

const DashboardPrivate = React.memo(_DashboardPrivate);
export default DashboardPrivate;
