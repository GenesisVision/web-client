import { DashboardTradingAsset } from "gv-api-web";
import {
  fetchDashboardInvestmentsFundsAction,
  fetchDashboardInvestmentsMostProfitableAction,
  fetchDashboardInvestmentsProgramsAction,
  fetchDashboardInvestmentsTotalAction
} from "pages/dashboard/actions/dashboard.actions";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import DashboardPublicCard from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import { dashboardInvestmentsMostProfitableSelector } from "pages/dashboard/reducers/dashboard-investments-most-profitable.reducer";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _DashboardInvestingMostProfitable: React.FC = () => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  const handleUpdateItems = useCallback(
    updateItems => () => {
      dispatch(fetchDashboardInvestmentsProgramsAction());
      dispatch(fetchDashboardInvestmentsFundsAction({ showIn: currency }));
      dispatch(fetchDashboardInvestmentsTotalAction(currency));
      updateItems();
    },
    [currency]
  );
  return (
    <DashboardInvestingTable
      dataSelector={dashboardInvestmentsMostProfitableSelector}
      action={fetchDashboardInvestmentsMostProfitableAction}
      title={t("dashboard-page.investing.most-profitable")}
      renderBodyCard={(
        asset: DashboardTradingAsset,
        updateRow,
        updateItems
      ) => (
        <DashboardPublicCard
          showActions={false}
          updateItems={handleUpdateItems(updateItems)!}
          asset={asset}
        />
      )}
    />
  );
};

const DashboardInvestingMostProfitable = React.memo(
  _DashboardInvestingMostProfitable
);
export default DashboardInvestingMostProfitable;
