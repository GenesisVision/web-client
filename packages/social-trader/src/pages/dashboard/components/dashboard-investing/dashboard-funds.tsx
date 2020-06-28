import { DataStorageContext } from "components/data-storage/data-storage";
import { FundInvestingDetailsList } from "gv-api-web";
import DashboardFundCard from "pages/dashboard/components/dashboard-investing/dashboard-fund-card";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import { getInvestingFunds } from "pages/dashboard/services/dashboard.service";
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
      getItemsFunc={getInvestingFunds}
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
