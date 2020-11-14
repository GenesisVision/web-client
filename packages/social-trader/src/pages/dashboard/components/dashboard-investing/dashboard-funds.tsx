import { DataStorageContext } from "components/data-storage/data-storage";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import { FundInvestingDetailsList } from "gv-api-web";
import DashboardFundCard from "pages/dashboard/components/dashboard-investing/dashboard-fund-card";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import {
  DASHBOARD_INVESTMENTS_DEFAULT_FILTERS,
  DASHBOARD_INVESTMENTS_FILTERING
} from "pages/dashboard/dashboard.constants";
import { getInvestingFunds } from "pages/dashboard/services/dashboard.service";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

const INIT_SORTING = "ByValueDesc";

const COLUMNS: SortingColumn[] = [
  { name: "name", sortingName: "ByTitle" },
  { name: "value", sortingName: "ByValue" },
  { name: "profit", sortingName: "ByProfit" },
  { name: "investors", sortingName: "ByInvestors" },
  { name: "drawdown", sortingName: "ByDrawdown" }
];

const _DashboardInvestingFunds: React.FC = () => {
  const { updateData } = useContext(DataStorageContext);
  const [t] = useTranslation();
  const handleUpdateItems = useCallback(
    (updateItems, item) => () => {
      updateData();
      updateItems(item);
    },
    []
  );
  return (
    <DashboardInvestingTable
      name={"DashboardInvestingFunds"}
      columns={COLUMNS}
      sorting={INIT_SORTING}
      filtering={DASHBOARD_INVESTMENTS_FILTERING}
      defaultFilters={DASHBOARD_INVESTMENTS_DEFAULT_FILTERS}
      getItemsFunc={getInvestingFunds}
      title={t("dashboard-page:investing.funds")}
      renderBodyCard={(
        fund: FundInvestingDetailsList,
        updateRow,
        updateItems
      ) => (
        <DashboardFundCard
          updateRow={handleUpdateItems(updateRow, fund)}
          updateItems={handleUpdateItems(updateItems!, fund)}
          fund={fund}
        />
      )}
    />
  );
};

const DashboardInvestingFunds = React.memo(_DashboardInvestingFunds);
export default DashboardInvestingFunds;
