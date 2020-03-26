import { ToolbarButton } from "components/table/components/toolbar-button";
import { DashboardTradingAsset } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import {
  fetchDashboardPublicAction,
  fetchDashboardTradingTotalAction
} from "pages/dashboard/actions/dashboard.actions";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import { dashboardTradingPublicSelector } from "pages/dashboard/reducers/dashboard-trading-public.reducer";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const _DashboardPublic: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const currency = useAccountCurrency();
  const [t] = useTranslation();
  const showIn = useAccountCurrency();
  const getItems = useCallback(filters => {
    return fetchDashboardPublicAction({
      ...filters,
      showIn
    });
  }, []);
  const handleUpdateItems = useCallback(
    updateItems => () => {
      dispatch(fetchDashboardTradingTotalAction(currency));
      updateItems();
    },
    [currency]
  );
  return (
    <DashboardTradingTable
      dataSelector={dashboardTradingPublicSelector}
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
