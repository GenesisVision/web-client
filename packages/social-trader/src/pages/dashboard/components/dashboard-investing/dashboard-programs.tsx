import { ProgramInvestingDetailsList } from "gv-api-web";
import { toggleFavoriteProgramDispatchable } from "modules/favorite-asset/services/favorite-program.service";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import DashboardProgramCard from "pages/dashboard/components/dashboard-investing/dashboard-program-card";
import { TitleContext } from "pages/dashboard/dashboard.constants";
import { getInvestingPrograms } from "pages/dashboard/services/dashboard.service";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const _DashboardInvestingPrograms: React.FC = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const title = useContext(TitleContext);
  return (
    <DashboardInvestingTable
      getItems={getInvestingPrograms}
      title={t("dashboard-page.investing.programs")}
      renderBodyCard={(
        program: ProgramInvestingDetailsList,
        updateRow,
        updateItems
      ) => (
        <DashboardProgramCard
          updateItems={updateItems!}
          title={title}
          program={program}
          toggleFavorite={(id: string, isFavorite: boolean) =>
            dispatch(toggleFavoriteProgramDispatchable(id, isFavorite))
          }
        />
      )}
    />
  );
};

const DashboardInvestingPrograms = React.memo(_DashboardInvestingPrograms);
export default DashboardInvestingPrograms;
