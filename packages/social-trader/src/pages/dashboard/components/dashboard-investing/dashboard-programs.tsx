import { DataStorageContext } from "components/data-storage/data-storage";
import { ProgramInvestingDetailsList } from "gv-api-web";
import { fetchDashboardInvestmentsProgramsAction } from "pages/dashboard/actions/dashboard.actions";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import DashboardProgramCard from "pages/dashboard/components/dashboard-investing/dashboard-program-card";
import { dashboardInvestmentsProgramsSelector } from "pages/dashboard/reducers/dashboard-investments-programs.reducer";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

const _DashboardInvestingPrograms: React.FC = () => {
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
      dataSelector={dashboardInvestmentsProgramsSelector}
      action={fetchDashboardInvestmentsProgramsAction}
      title={t("dashboard-page.investing.programs")}
      renderBodyCard={(
        program: ProgramInvestingDetailsList,
        updateRow,
        updateItems
      ) => (
        <DashboardProgramCard
          updateRow={handleUpdateItems(updateRow)}
          updateItems={handleUpdateItems(updateItems)!}
          program={program}
        />
      )}
    />
  );
};

const DashboardInvestingPrograms = React.memo(_DashboardInvestingPrograms);
export default DashboardInvestingPrograms;
