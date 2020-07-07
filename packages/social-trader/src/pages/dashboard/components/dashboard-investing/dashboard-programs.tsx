import { DataStorageContext } from "components/data-storage/data-storage";
import { ProgramInvestingDetailsList } from "gv-api-web";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import DashboardProgramCard from "pages/dashboard/components/dashboard-investing/dashboard-program-card";
import {
  DASHBOARD_INVESTMENTS_DEFAULT_FILTERS,
  DASHBOARD_INVESTMENTS_FILTERING
} from "pages/dashboard/dashboard.constants";
import { getInvestingPrograms } from "pages/dashboard/services/dashboard.service";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

const _DashboardInvestingPrograms: React.FC = () => {
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
      filtering={DASHBOARD_INVESTMENTS_FILTERING}
      defaultFilters={DASHBOARD_INVESTMENTS_DEFAULT_FILTERS}
      getItemsFunc={getInvestingPrograms}
      title={t("dashboard-page:investing.programs")}
      renderBodyCard={(
        program: ProgramInvestingDetailsList,
        updateRow,
        updateItems
      ) => (
        <DashboardProgramCard
          updateRow={handleUpdateItems(updateRow, program)}
          updateItems={handleUpdateItems(updateItems, program)!}
          program={program}
        />
      )}
    />
  );
};

const DashboardInvestingPrograms = React.memo(_DashboardInvestingPrograms);
export default DashboardInvestingPrograms;
