import { DataStorageContext } from "components/data-storage/data-storage";
import { ProgramInvestingDetailsList } from "gv-api-web";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import DashboardProgramCard from "pages/dashboard/components/dashboard-investing/dashboard-program-card";
import { getInvestingPrograms } from "pages/dashboard/services/dashboard.service";
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
      getItemsFunc={getInvestingPrograms}
      title={t("dashboard-page:investing.programs")}
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
