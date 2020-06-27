import { DataStorageContext } from "components/data-storage/data-storage";
import { FundInvestingDetailsList } from "gv-api-web";
import { fetchDashboardInvestmentsFundsAction } from "pages/dashboard/actions/dashboard.actions";
import DashboardFundCard from "pages/dashboard/components/dashboard-investing/dashboard-fund-card";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import { dashboardInvestmentsFundsSelector } from "pages/dashboard/reducers/dashboard-investments-funds.reducer";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

const _DashboardInvestingFunds: React.FC = () => {
  const { updateData } = useContext(DataStorageContext);
  const [t] = useTranslation();
  const handleUpdateItems = useCallback(
    updateItems => () => {
      updateData();
      updateItems();
    },
    []
  );
  return (
    <DashboardInvestingTable
      dataSelector={dashboardInvestmentsFundsSelector}
      action={fetchDashboardInvestmentsFundsAction}
      title={t("dashboard-page.investing.funds")}
      renderBodyCard={(
        fund: FundInvestingDetailsList,
        updateRow,
        updateItems
      ) => (
        <DashboardFundCard
          updateRow={handleUpdateItems(updateRow)}
          updateItems={handleUpdateItems(updateItems!)}
          fund={fund}
        />
      )}
    />
  );
};

const DashboardInvestingFunds = React.memo(_DashboardInvestingFunds);
export default DashboardInvestingFunds;
